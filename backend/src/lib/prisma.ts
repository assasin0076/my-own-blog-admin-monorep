import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
const connectionString = process.env.DATABASE_URL!;

const createPrismaContext = () => {
  const adapter = new PrismaPg({ connectionString });
  const prismaService = new PrismaClient({ adapter });
  return {
    prisma: prismaService,
    stop: async () => {
      await prismaService.$disconnect();
    },
  };
};

export { createPrismaContext };
export type PrismaContext = ReturnType<typeof createPrismaContext>;
