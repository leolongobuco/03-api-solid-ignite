import { Gym, Prisma } from "@prisma/client";

export interface IFindManyNearbyParams {
  userLatitude: number;
  userLongitude: number;
}

export interface IGymsRepository {
  findById(id: string): Promise<Gym | null>;
  create(data: Prisma.GymCreateInput): Promise<Gym>;
  findManyByQuery(query: string, page: number): Promise<Gym[]>;
  findManyNearby({
    userLatitude,
    userLongitude,
  }: IFindManyNearbyParams): Promise<Gym[]>;
}
