import { execSync } from 'child_process';
import 'dotenv/config';
import fs from 'fs-extra';

async function prepareStoriesFolder() {
  const STORIES_KEY = process.env.STORIES_KEY;
  const STORIES_REPO = process.env.STORIES_REPO;
  const gitUrl = `https://oauth2:${STORIES_KEY}@github.com/${STORIES_REPO}.git`;
  if (
    !fs.pathExistsSync('./_stories') ||
    fs.readdirSync('./_stories').length === 0
  ) {
    try {
      console.info("Stories folder doesn't exist, cloning...");
      execSync(`git clone ${gitUrl} _stories`);
      console.info('Successfuly cloning stories folder.');
    } catch (error) {
      console.error('Failed to clone the repository.');
    }
    return;
  }
  try {
    console.info('Stories folder already exist, syncing...');
    execSync(`
      cd _stories && 
      git fetch origin && 
      git reset --hard origin/main && 
      git pull
    `);
    console.info('Successfuly synced stories folder.');
  } catch (error) {
    console.error('Failed to sync the repository.');
  }
  return;
}

async function main() {
  const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV ?? 'local';
  try {
    await prepareStoriesFolder();
    if (APP_ENV === 'local') {
      return;
    }
    fs.copyFileSync(`./stubs/${APP_ENV}.robots.txt`, './public/robots.txt');
    fs.copyFileSync('./stubs/sitemap.xml', './public/sitemap.xml');
    console.info('Robots TXT and sitemap sucessfully copied.');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error occurred:', error.message);
    }
  }
}

main();

export {};
