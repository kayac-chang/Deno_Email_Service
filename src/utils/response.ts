import { Response, Status, curry } from "../def.ts";

export const ok = curry(<T>(response: Response, data: T) => {
  return Object.assign(response, {
    status: Status.OK,
    body: {
      success: true,
      data,
    },
  });
});

export const created = curry(<T>(response: Response, data: T) => {
  return Object.assign(response, {
    status: Status.Created,
    body: {
      success: true,
      data,
    },
  });
});

export const badRequest = curry((response: Response, msg: string) => {
  return Object.assign(response, {
    status: Status.BadRequest,
    body: {
      success: false,
      msg,
    },
  });
});

export const unauthorized = curry((response: Response, msg: string) => {
  return Object.assign(response, {
    status: Status.Unauthorized,
    body: {
      success: false,
      msg,
    },
  });
});

export const notFound = curry((response: Response, msg: string) => {
  return Object.assign(response, {
    status: Status.NotFound,
    body: {
      success: false,
      msg,
    },
  });
});
