type Environments = 'local' | 'production';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL as string;
const APP_ENV = (process.env.NEXT_PUBLIC_APP_ENV as Environments) ?? 'local';

const STORIES_URL = process.env.NEXT_PUBLIC_STORIES_URL;

export { APP_ENV, APP_URL, STORIES_URL };
