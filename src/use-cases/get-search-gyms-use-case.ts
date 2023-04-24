import { IGymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface GetSearchGymUseCaseRequest {
  query: string;
  page: number;
}

interface GetSearchGymUseCaseResponseBody {
  gyms: Gym[];
}

export class GetSearchGymUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    query,
    page,
  }: GetSearchGymUseCaseRequest): Promise<GetSearchGymUseCaseResponseBody> {
    const gyms = await this.gymsRepository.findManyByQuery(query, page);

    return { gyms };
  }
}
