import 'dotenv/config';
import fs from 'fs-extra';

async function main() {
  const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV ?? 'local';
  try {
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
