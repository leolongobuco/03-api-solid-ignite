import { expect, describe, it, beforeEach } from "vitest";

import { GetUserCheckInsMetricsUseCase } from "./get-user-check-ins-metrics-use-case";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-respository";
import { GetNearbyGymsUseCase } from "./get-nearby-gyms-use-case";

let gymsRepository: InMemoryGymsRepository;
let gymsUseCase: GetNearbyGymsUseCase;

describe("Get Nearby Gyms Use Case", async () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository();
    gymsUseCase = new GetNearbyGymsUseCase(gymsRepository);
  });

  it("should be able to get nearby gyms", async () => {
    await gymsRepository.create({
      title: "near gym",
      description: "",
      phone: "",
      latitude: -27.2092052,
      longitude: -49.6401091,
    });

    await gymsRepository.create({
      title: "far gym",
      description: "",
      phone: "",
      latitude: -27.0610928,
      longitude: -49.5229501,
    });

    const { gyms } = await gymsUseCase.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "near gym" })]);
  });
});
