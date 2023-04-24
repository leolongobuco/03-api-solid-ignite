import { FastifyInstance } from "fastify";

import { authenticateController } from "./controllers/authenticate-controller";
import { registerController } from "./controllers/register-controller";
import { getUserProfileController } from "./controllers/get-user-profile-controller";
import { verifyJWT } from "@/middlewares/verify-jwt";

export async function appRoutes(app: FastifyInstance) {
  app.post("/users", registerController);
  app.post("/sessions", authenticateController);
  app.get("/me", { onRequest: [verifyJWT] }, getUserProfileController);
}
