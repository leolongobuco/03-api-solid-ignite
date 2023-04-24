import { RegisterUseCase } from "../register-use-case";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository();

  const useCase = new RegisterUseCase(usersRepository);

  return useCase;
}
