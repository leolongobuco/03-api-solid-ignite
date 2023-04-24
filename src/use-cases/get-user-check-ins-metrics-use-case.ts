import { ICheckInsRepository } from "@/repositories/check-ins-repository";

interface GetUserCheckInsMetricsUseCaseRequest {
  userId: string;
}

interface GetUserCheckInsMetricsUseCaseResponse {
  checkInsCount: number;
}

export class GetUserCheckInsMetricsUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  async execute({
    userId,
  }: GetUserCheckInsMetricsUseCaseRequest): Promise<GetUserCheckInsMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUserId(userId);

    return {
      checkInsCount,
    };
  }
}
