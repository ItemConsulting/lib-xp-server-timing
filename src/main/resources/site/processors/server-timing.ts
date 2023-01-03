import { Request, Response } from "@item-enonic-types/global/controller";

export function responseProcessor(req: Request, res: Response): Response {
  const initialHeaders = res.headers ?? {};
  const headers: Record<string, string | undefined> = {};
  const serverTimings: Array<string> = [];

  for (const k in initialHeaders) {
    const value = initialHeaders[k];

    if (k.indexOf("-server-timing") !== -1 && value) {
      serverTimings.push(value);
    } else {
      headers[k] = value;
    }
  }

  headers["server-timing"] = serverTimings.join(", ");
  res.headers = headers;

  return res;
}
