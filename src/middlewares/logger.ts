import { info, Middleware } from "../def.ts";

const logger: Middleware = async ({ request, response }, next) => {
  await next();

  const time = response.headers.get("X-Response-Time");
  info(`${request.method} ${request.url.pathname} - ${time}`);
};

export default logger;
