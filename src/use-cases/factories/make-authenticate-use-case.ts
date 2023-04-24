import { AuthenticateUseCase } from "../authenticate-use-case";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeAuthenticateUseCase() {
  const usersRepository = new PrismaUsersRepository();

  const useCase = new AuthenticateUseCase(usersRepository);

  return useCase;
}
