import { CheckIn, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { ICheckInsRepository } from "../check-ins-repository";
import dayjs from "dayjs";

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  public checkIns: CheckIn[] = [];

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      user_id: data.user_id,
      gym_id: data.gym_id,
      created_at: new Date(),
    };
    this.checkIns.push(checkIn);

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");

    const endOfTheDay = dayjs(date).endOf("date");

    const checkInOnSameDate = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);

      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) return null;

    return checkInOnSameDate;
  }

  async findManyByUserId(userId: string, page: number) {
    return this.checkIns
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20);
  }

  async countByUserId(userId: string) {
    return this.checkIns.filter((checkIn) => checkIn.user_id === userId).length;
  }

  async findById(checkInId: string) {
    const checkIn = this.checkIns.find((checkIn) => checkIn.id === checkInId);

    if (!checkIn) return null;

    return checkIn;
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.checkIns.findIndex(
      (sameCheckIn) => sameCheckIn.id === checkIn.id
    );

    if (checkInIndex >= 0) {
      this.checkIns[checkInIndex] = checkIn;
    }

    return checkIn;
  }
}
