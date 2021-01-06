// deno-lint-ignore-file

export interface Email {
  id: number;
  send_from: string;
  organization: string;
  address: string;
  phone: string;
  content: string;
  created_on: Date;
}

export const toEmail = ([
  id,
  send_from,
  organization,
  address,
  phone,
  content,
  created_on,
]: any[]) => ({
  id,
  send_from,
  organization,
  address,
  phone,
  content,
  created_on: new Date(created_on),
});
