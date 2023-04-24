import { IGymsRepository } from "@/repositories/gyms-repository";
import { Gym } from "@prisma/client";

interface CreateGymUseCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymUseCaseResponseBody {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    title,
    latitude,
    longitude,
    description,
    phone,
  }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponseBody> {
    const gym = await this.gymsRepository.create({
      title,
      latitude,
      longitude,
      description,
      phone,
    });

    return { gym };
  }
}
