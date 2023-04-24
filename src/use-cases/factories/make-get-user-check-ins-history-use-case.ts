import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { GetUserCheckInsHistoryUseCase } from "../get-user-check-ins-history-use-case";

export function makeGetUserCheckInsHistoryUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();

  const useCase = new GetUserCheckInsHistoryUseCase(checkInsRepository);

  return useCase;
}
