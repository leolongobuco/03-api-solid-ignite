import dayjs from "dayjs";
import { Prisma, CheckIn } from "@prisma/client";

import { ICheckInsRepository } from "../check-ins-repository";
import { prisma } from "@/lib/prisma";

export class PrismaCheckInsRepository implements ICheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = prisma.checkIn.create({
      data: data,
    });

    return checkIn;
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf("date");

    const endOfTheDay = dayjs(date).endOf("date");

    const checkIn = await prisma.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return checkIn;
  }

  async findManyByUserId(userId: string, page: number) {
    const checkIns = await prisma.checkIn.findMany({
      where: {
        user_id: userId,
      },
      take: 20,
      skip: (page - 1) * 20,
    });

    return checkIns;
  }

  async countByUserId(userId: string) {
    const countCheckIns = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    });

    return countCheckIns;
  }

  async findById(checkInid: string) {
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id: checkInid,
      },
    });

    return checkIn;
  }

  async save(checkIn: CheckIn) {
    const checkInSaved = await prisma.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: checkIn,
    });

    return checkInSaved;
  }
}
