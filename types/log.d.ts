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
 * Function signature for the logger
 */
export type Log = (vars: string | LoggableRecord) => void;

export type UseLog = (vars: string | LoggableRecord) => void;

declare global {
  var log: Log;
  var useLog: UseLog;
}

export {};
