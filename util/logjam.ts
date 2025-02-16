if (typeof globalThis.logJammer === "undefined") {
  const logWithDivider = (key: string, value: any) => {
    console.log("..................................");

    if (typeof value === "object") {
      console.log(`${key}: ${JSON.stringify(value, null, 2)}`);
    } else {
      console.log(`${key}: ${value}`);
    }
  };

  Object.defineProperty(globalThis, "logJammer", {
    value: (vars: string | Record<string, any>) => {
      if (typeof vars === "string") {
        console.log("..................................");

        console.log(vars);
      } else {
        Object.entries(vars).forEach(([key, value]) => {
          logWithDivider(key, value);
        });
      }

      console.log("..................................");
    },
    configurable: false,
    writable: false,
  });
}
