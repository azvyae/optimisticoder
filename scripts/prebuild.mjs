import 'dotenv/config';
import { copyFileSync } from 'fs';

async function main() {
  const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV ?? 'local';
  try {
    if (APP_ENV === 'local') {
      return;
    }
    copyFileSync(`./stubs/${APP_ENV}.robots.txt`, './public/robots.txt');
    copyFileSync('./stubs/sitemap.xml', './public/sitemap.xml');
    console.info('Robots TXT and sitemap sucessfully copied.');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error occurred:', error.message);
    }
  }
}

main();

export {};
