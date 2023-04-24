import { expect, describe, it, beforeEach } from "vitest";

import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-respository";
import { CreateGymUseCase } from "./create-gym-use-case";

let gymsRepository: InMemoryGymsRepository;
let gymUseCase: CreateGymUseCase;

describe("Create Gym Use Case", () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository();
    gymUseCase = new CreateGymUseCase(gymsRepository);
  });

  it("should be able to create gym", async () => {
    const { gym } = await gymUseCase.execute({
      latitude: 0,
      description: null,
      phone: null,
      longitude: 0,
      title: "gym-01",
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
