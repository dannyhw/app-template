import { useEffect } from "react";
import type { LoggableRecord, UseLog } from "../types/log";
import { log } from "../util/log";

export const useLog: UseLog = (vars: string | LoggableRecord) => {
  useEffect(() => {
    log(vars);
  }, [vars]);
};

// Ensure we're in a JS environment with globalThis
if (typeof globalThis !== "undefined") {
  globalThis.useLog = useLog;
}
