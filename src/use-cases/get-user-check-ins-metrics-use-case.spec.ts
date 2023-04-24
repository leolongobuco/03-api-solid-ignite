import { expect, describe, it, beforeEach } from "vitest";

import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserCheckInsMetricsUseCase } from "./get-user-check-ins-metrics-use-case";

let checkInsRepository: InMemoryCheckInsRepository;
let getUserCheckinMetrics: GetUserCheckInsMetricsUseCase;

describe("Get User Check-ins Metrics Use Case", async () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository();
    getUserCheckinMetrics = new GetUserCheckInsMetricsUseCase(
      checkInsRepository
    );
  });

  it("should be able to get user check-ins count metrics", async () => {
    await checkInsRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    await checkInsRepository.create({
      gym_id: "gym-02",
      user_id: "user-01",
    });

    const { checkInsCount } = await getUserCheckinMetrics.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toEqual(2);
  });
});
