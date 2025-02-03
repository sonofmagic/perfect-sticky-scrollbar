import type PerfectScrollbar from '.'

export type RemoveNull<T, K extends keyof T = keyof T> = {
  [P in K]: Exclude<T[P], null>;
}

export type RequiredPerfectScrollbar = RemoveNull<PerfectScrollbar>
