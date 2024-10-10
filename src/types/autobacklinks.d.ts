type AutoBacklinks = {
  url: string;
  label: string;
}[];

type AutoBacklinksWindow = {
  onBacklinksLoaded(data: AutoBacklinks): void;
  Backlinks: AutoBacklinks;
} & Window &
  typeof globalThis;
