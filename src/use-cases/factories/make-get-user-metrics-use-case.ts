import { GetUserCheckInsMetricsUseCase } from "../get-user-check-ins-metrics-use-case";
import { PrismaCheckInsRepository } from "@/repositories/prisma/prisma-check-ins-repository";

export function makeGetUserCheckInsMetricsUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository();

  const useCase = new GetUserCheckInsMetricsUseCase(checkInsRepository);

  return useCase;
}
