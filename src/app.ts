import { Application } from "./def.ts";
import { info, error } from "./def.ts";

import Logger from "./middlewares/logger.ts";
import Timer from "./middlewares/timer.ts";
import Error from "./middlewares/error.ts";
import router from "./router.ts";

const app = new Application();

app.addEventListener("listen", ({ hostname, port, secure }) => {
  const protoc = secure ? "https" : "http";
  const addr = hostname ? `${protoc}://${hostname}` : `port ${port}`;

  info(`Listening on ${addr}`);
});

app.addEventListener("error", (event) => error(event.error));

app.use(Error);
app.use(Logger);
app.use(Timer);
app.use(router.routes());
app.use(router.allowedMethods());

const port = Number(Deno.env.get("PORT") || 3000);
await app.listen({ port });
