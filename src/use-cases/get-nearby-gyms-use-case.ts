import { IGymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface GetNearbyGymsUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface GetNearbyGymsUseCaseResponseBody {
  gyms: Gym[];
}

export class GetNearbyGymsUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: GetNearbyGymsUseCaseRequest): Promise<GetNearbyGymsUseCaseResponseBody> {
    const gyms = await this.gymsRepository.findManyNearby({
      userLatitude,
      userLongitude,
    });

    return { gyms };
  }
}
