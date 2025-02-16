import type { Log, LoggableRecord, LoggableValue } from "../types/log";

const logWithDivider = (key: string, value: LoggableValue) => {
  console.log("..................................");

  if (typeof value === "object") {
    console.log(`${key}: ${JSON.stringify(value, null, 2)}`);
  } else {
    console.log(`${key}: ${value}`);
  }
};

export const log: Log = (vars: string | LoggableRecord) => {
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

// Augment globalThis type to include our log function
declare global {
  interface GlobalThis {
    log: Log;
  }
}

// Ensure we're in a JS environment with globalThis
if (typeof globalThis !== "undefined") {
  // Define the global log function
  globalThis.log = log;
}
