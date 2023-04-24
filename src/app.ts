import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";

import { appRoutes } from "./http/routes";
import { fastifyJwt } from "@fastify/jwt";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET_KEY,
  sign: {
    expiresIn: "1d",
  },
});
app.register(appRoutes);

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: here we should log to on external tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: "Internal server error" });
});
