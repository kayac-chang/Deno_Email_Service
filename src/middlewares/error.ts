import { Middleware, isHttpError, Status } from "../def.ts";
import { badRequest, notFound, unauthorized } from "../utils/response.ts";

const error: Middleware = ({ response }, next) => {
  return next().catch((err) => {
    if (!isHttpError(err)) {
      throw err;
    }

    switch (err.status) {
      case Status.NotFound:
        return notFound(response, err.message);
      case Status.BadRequest:
        return badRequest(response, err.message);
      case Status.Unauthorized:
        return unauthorized(response, err.message);

      default:
        throw err;
    }
  });
};

export default error;
