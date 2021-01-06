import { RouterContext as Context, curry } from "../def.ts";
import { badRequest } from "../utils/response.ts";

type RouterFn = (context: Context) => void;

export const hasBody = curry((fn: RouterFn, context: Context) => {
  const { request, response } = context;

  if (!request.hasBody) {
    return badRequest(response, "Request body should not be empty");
  }

  return fn(context);
});

export const isJSON = curry((fn: RouterFn, context: Context) => {
  const { request, response } = context;

  const type = request.headers.get("Content-Type");

  if (type !== "application/json") {
    return badRequest(response, "Request body should be JSON");
  }

  return fn(context);
});
