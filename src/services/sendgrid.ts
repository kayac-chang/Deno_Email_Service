import { Status, HttpError, renderToString } from "../def.ts";

import { Email } from "../types.ts";
import { postJSON } from "../utils/request.ts";

const API = Deno.env.get("SENDGRID_API") || "";
const KEY = `Bearer ${Deno.env.get("SENDGRID_KEY")}`;
const SENDER = Deno.env.get("SENDGRID_SENDER") || "";
const RECEIVER = Deno.env.get("SENDGRID_RECEIVER") || "";
const TITLE = Deno.env.get("SENDGRID_TITLE") || "";
const EMAIL_TEMPLATE = await Deno.readTextFile(`templates/email.tmp`);

interface SendGridError {
  message: string;
  field: string;
  help: string;
}

export async function send(email: Email) {
  email.created_on = new Date();

  const result = await postJSON(API, {
    headers: {
      Authorization: KEY,
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: RECEIVER }] }],
      from: { email: SENDER },
      subject: TITLE,
      content: [
        {
          type: "text/plain",
          value: await renderToString(EMAIL_TEMPLATE, email),
        },
      ],
    }),
  });

  if (result.status !== Status.Accepted) {
    const errors = (await result.json()).errors as SendGridError[];

    throw Object.assign(new HttpError(), {
      status: result.status,
      message: errors.map(({ message }) => message).join(),
    });
  }

  return email;
}

export default { send };
