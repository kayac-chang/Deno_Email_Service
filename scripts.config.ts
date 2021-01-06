import { DenonConfig } from "https://deno.land/x/denon@2.4.5/mod.ts";
import { config as env } from "https://deno.land/x/dotenv/mod.ts";

const config: DenonConfig = {
  scripts: {
    start: {
      cmd: "deno run src/app.ts",
      desc: "run service",
      env: env(),
      allow: ["env", "read", "net"],
    },
  },
};

export default config;
