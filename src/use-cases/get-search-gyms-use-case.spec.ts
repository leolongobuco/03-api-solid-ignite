import { expect, describe, it, beforeEach } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-respository";
import { GetSearchGymUseCase } from "./get-search-gyms-use-case";

let gymsRepository: InMemoryGymsRepository;
let gymUseCase: GetSearchGymUseCase;

describe("Get Search Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    gymUseCase = new GetSearchGymUseCase(gymsRepository);
  });

  it("should be able to search gym by query", async () => {
    await gymsRepository.create({
      title: "Gym 1",
      description: "Gym 1 description",
      latitude: 0,
      longitude: 0,
      phone: "12345678",
    });

    await gymsRepository.create({
      title: "Gym 2",
      description: "Gym 1 description",
      latitude: 0,
      longitude: 0,
      phone: "12345678",
    });

    const { gyms } = await gymUseCase.execute({ query: "Gym 1", page: 1 });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "Gym 1" })]);
  });

  it.todo("should be able to get paginated gym by search", async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `gym-${i}`,
        latitude: i,
        longitude: i,
        phone: "12345678",
        description: `gym-${i} description`,
      });
    }

    const { gyms } = await gymUseCase.execute({
      query: "gym-22",
      page: 2,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "gym-22" })]);
  });
});
