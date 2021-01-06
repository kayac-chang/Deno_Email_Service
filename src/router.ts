import { Router } from "./def.ts";

import Email from "./controllers/email.ts";
import { hasBody, isJSON } from "./utils/decorator.ts";

const router = new Router();

router
  //
  .get("/email", Email.getAll)
  .post("/email", hasBody(isJSON(Email.add)));

export default router;
