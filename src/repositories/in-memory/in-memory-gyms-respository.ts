import { randomUUID } from "node:crypto";
import { Gym, Prisma } from "@prisma/client";

import { IFindManyNearbyParams, IGymsRepository } from "../gyms-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

export class InMemoryGymsRepository implements IGymsRepository {
  public gyms: Gym[] = [];

  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(Number(data.latitude)),
      longitude: new Prisma.Decimal(Number(data.longitude)),
      created_at: new Date(),
    };

    this.gyms.push(gym);

    return gym;
  }

  async findById(id: string) {
    const gym = this.gyms.find((gym) => gym.id === id);

    if (!gym) return null;

    return gym;
  }

  async findManyByQuery(query: string, page: number) {
    return this.gyms
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20);
  }

  async findManyNearby({ userLatitude, userLongitude }: IFindManyNearbyParams) {
    return this.gyms.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: userLatitude, longitude: userLongitude },
        { latitude: Number(gym.latitude), longitude: Number(gym.longitude) }
      );

      return distance < 10;
    });
  }
}
