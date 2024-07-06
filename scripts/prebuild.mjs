import { execSync } from 'child_process';
import 'dotenv/config';
import fs from 'fs-extra';

async function prepareStoriesFolder() {
  if (!fs.pathExistsSync('./stories')) {
    try {
      console.info("Stories folder doesn't exist, cloning...");
      execSync(
        'git clone git@github.com:azvyae/optimisticoder-stories.git stories',
      );
      console.info('Successfuly cloning stories folder.');
    } catch (error) {
      console.error('Failed to clone the repository.');
    }
    return;
  }
  try {
    console.info('Stories folder already exist, syncing...');
    execSync(`
      cd stories && 
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
    console.info(fs.readdirSync('./stories'));
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
