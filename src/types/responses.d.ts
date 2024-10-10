import type { IntRange, MergeObject } from './utils';

type ErrorResponse = {
  ok: false;
  status: Exclude<IntRange<400, 599>, 422>;
  json(): Promise<{ message: string }>;
} & Omit<Response, 'json' | 'ok' | 'status'>;

type OffsetResourceResponse<T extends object> =
  | ({
      ok: true;
      status: IntRange<100, 299>;
      json(): Promise<{ total: number; retrieved: number; data: T[] }>;
    } & Omit<Response, 'json' | 'ok' | 'status'>)
  | RedirectResponse
  | ErrorResponse;

type CursorResourceResponse<T extends object> =
  | ({
      ok: true;
      status: IntRange<100, 299>;
      json(): Promise<{
        total: number;
        retrieved: number;
        next: string | null;
        prev: string | null;
        data: T[];
      }>;
    } & Omit<Response, 'json' | 'ok' | 'status'>)
  | RedirectResponse
  | ErrorResponse;

type CommonResponse<T extends object | never> =
  | ({
      ok: true;
      status: IntRange<100, 299>;
      json: T extends never
        ? never
        : () => Promise<
            T extends { message: string }
              ? MergeObject<T & { errors: undefined }>
              : T
          >;
    } & Omit<Response, 'json' | 'ok' | 'status'>)
  | RedirectResponse
  | ErrorResponse;

type RedirectResponse = {
  ok: false;
  status: Exclude<IntRange<300, 399>, 303>;
  json: never;
} & Omit<Response, 'json' | 'ok' | 'status'>;

type SeeOtherResponse<T extends object | never> = {
  ok: false;
  status: 303;
  json: T extends never
    ? never
    : () => Promise<
        T extends { message: string }
          ? MergeObject<T & { errors: undefined }>
          : T
      >;
} & Omit<Response, 'json' | 'ok' | 'status'>;

type ValidationResponse<T extends string[]> = {
  ok: false;
  status: 422;
  json(): Promise<{
    message: string;
    errors: {
      [key in T[number]]?: string[];
    };
  }>;
} & Omit<Response, 'json' | 'ok' | 'status'>;

type PlainTextResponse =
  | ({
      ok: true;
      status: IntRange<100, 299>;
      json: never;
      text(): Promise<string>;
    } & Omit<Response, 'text' | 'json' | 'ok' | 'status'>)
  | RedirectResponse
  | ErrorResponse;
