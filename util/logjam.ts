import type {
  LoggableRecord,
  LoggableValue,
  LogjamFunction,
} from "../types/logjam";

// Augment globalThis type to include our logjam function
declare global {
  interface GlobalThis {
    logjam: LogjamFunction;
  }
}

const logWithDivider = (key: string, value: LoggableValue) => {
  console.log("..................................");

  if (typeof value === "object") {
    console.log(`${key}: ${JSON.stringify(value, null, 2)}`);
  } else {
    console.log(`${key}: ${value}`);
  }
};

const logger: LogjamFunction = (vars: string | LoggableRecord) => {
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

// Ensure we're in a JS environment with globalThis
if (typeof globalThis !== "undefined") {
  // Define the global logjam function
  globalThis.logjam = logger;
}

// Export for module usage if needed
export { logger as logjam };
