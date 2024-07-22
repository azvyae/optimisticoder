import { execSync } from 'child_process';
import 'dotenv/config';
import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';
import type { MetadataRoute } from 'next';
import type { CategoryIndexEntry, StoriesIndexEntry } from '@/types/common';

const storiesDir = '_stories';
const storiesIndexerPath = path.join(
  process.cwd(),
  storiesDir,
  'index-stories.json',
);
const categoryIndexerPath = path.join(
  process.cwd(),
  storiesDir,
  'index-categories.json',
);

const generatedSitemapFilePath = path.join(
  process.cwd(),
  'src',
  'generated-sitemap.json',
);

async function prepareStoriesFolder() {
  const STORIES_KEY = process.env.STORIES_KEY;
  const STORIES_REPO = process.env.STORIES_REPO;
  const gitUrl = `https://oauth2:${STORIES_KEY}@github.com/${STORIES_REPO}.git`;
  if (
    !fs.pathExistsSync(`./${storiesDir}`) ||
    fs.readdirSync(`./${storiesDir}`).length === 0
  ) {
    try {
      console.info("Stories folder doesn't exist, cloning...");
      execSync(`git clone ${gitUrl} ${storiesDir}`);
      console.info('Successfuly cloning stories folder.');
    } catch (error) {
      console.error('Failed to clone the repository.');
    }
    return;
  }
  try {
    console.info('Stories folder already exist, syncing...');
    execSync(`
      cd ${storiesDir} && 
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

async function getFiles(dir: string, depth: number = 0): Promise<string[]> {
  const subdirs = await fs.readdir(dir);
  const files = await Promise.all(
    subdirs.map(async (subdir) => {
      const res = path.resolve(dir, subdir);
      const stat = await fs.stat(res);

      // Skip .git, node_modules, and all first-level files
      if (
        subdir === '.git' ||
        subdir === 'node_modules' ||
        (depth === 0 && stat.isFile())
      ) {
        return [];
      }

      // Recursively get files from directories, filter out non-page.md files
      if (stat.isDirectory()) {
        return getFiles(res, depth + 1);
      } else if (path.basename(res) === 'page.md') {
        return [res];
      } else {
        return [];
      }
    }),
  );

  return files.reduce((a, f) => a.concat(f), []);
}

async function indexFiles() {
  const files = await getFiles(storiesDir);
  const storiesIndex: StoriesIndexEntry[] = [];
  const categoriesIndex: CategoryIndexEntry = [];

  for (const file of files) {
    if (path.basename(file) === 'page.md') {
      const content = await fs.readFile(file, 'utf8');
      const { data } = matter(content);
      const relativePath = path.relative(storiesDir, file);
      const [category, slug] = relativePath.split(path.sep);

      storiesIndex.push({
        title: data.title,
        slug: slug,
        category: category,
        subtitle: data.subtitle,
        keywords: data.keywords,
        excerpt: data.excerpt,
        cover: data.cover,
        date: data.date,
      });
      if (!categoriesIndex.includes(category)) {
        categoriesIndex.push(category);
      }
    }
  }
  // Sort the index by date
  storiesIndex.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  fs.writeFileSync(storiesIndexerPath, JSON.stringify(storiesIndex, null, 2));
  fs.writeFileSync(
    categoryIndexerPath,
    JSON.stringify(categoriesIndex, null, 2),
  );
  console.info('Indexing complete. Check index file for results.');
}

async function generateSitemapXml() {
  const sitemapEntries: MetadataRoute.Sitemap = [];
  const storiesIndexes: StoriesIndexEntry[] = JSON.parse(
    fs.readFileSync(storiesIndexerPath).toString(),
  );
  storiesIndexes.forEach((item) => {
    sitemapEntries.push({
      url: `https://optimisticoder.com/stories/${item.slug}`,
      lastModified: item.date,
      changeFrequency: 'weekly',
      priority: 0.5,
    });
  });
  fs.writeFileSync(
    generatedSitemapFilePath,
    JSON.stringify(sitemapEntries, null, 2),
  );
  console.info('Sitemap successfully generated.');
}

async function main() {
  const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV ?? 'local';
  try {
    await prepareStoriesFolder();
    await indexFiles();
    await generateSitemapXml();
    if (APP_ENV === 'local') {
      return;
    }
    fs.copyFileSync(`./stubs/${APP_ENV}.robots.txt`, './public/robots.txt');
    console.info('Robots TXT sucessfully copied.');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error occurred:', error.message);
    }
  }
}

main();

export {};
