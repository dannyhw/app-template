/**
 * Type for loggable values
 */
export type LoggableValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | object;

/**
 * Type for the record of loggable values
 */
export type LoggableRecord = Record<string, LoggableValue>;

/**
 * Function signature for the logjam logger
 */
export interface LogjamFunction {
  (message: string): void;
  (vars: LoggableRecord): void;
}

declare global {
  var logjam: LogjamFunction;
}

export {};
