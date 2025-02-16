import { useEffect } from "react";
import type {
  LoggableRecord,
  LoggableValue,
  UseLogger,
  LogjamFunction,
} from "../types/logjam";

const logWithDivider = (key: string, value: LoggableValue) => {
  console.log("..................................");

  if (typeof value === "object") {
    console.log(`${key}: ${JSON.stringify(value, null, 2)}`);
  } else {
    console.log(`${key}: ${value}`);
  }
};

export const logger: LogjamFunction = (vars: string | LoggableRecord) => {
  if (typeof vars === "string") {
    console.log("..................................");

    console.log(vars);
  } else {
    Object.entries(vars).forEach(([key, value]) => {
      logWithDivider(key, value);
    });
  }

  console.log("..................................");
};

export const useLogger: UseLogger = (vars: string | LoggableRecord) => {
  useEffect(() => {
    logger(vars);
  }, [vars]);
};

// Augment globalThis type to include our logjam function
declare global {
  interface GlobalThis {
    logjam: LogjamFunction;
    useLogjam: UseLogger;
  }
}

// Ensure we're in a JS environment with globalThis
if (typeof globalThis !== "undefined") {
  // Define the global logjam function
  globalThis.logjam = logger;

  globalThis.useLogjam = useLogger;
}
