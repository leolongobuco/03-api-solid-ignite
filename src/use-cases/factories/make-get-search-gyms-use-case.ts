import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";
import { GetSearchGymUseCase } from "../get-search-gyms-use-case";

export function makeGetSearchGymUseCase() {
  const gymsRepository = new PrismaGymsRepository();

  const useCase = new GetSearchGymUseCase(gymsRepository);

  return useCase;
}
