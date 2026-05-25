import { PrismaClient } from "../generated/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const prismaClientSingleton = () => {
  const pool = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({ adapter });
};

declare global {
  var prismaGlobalV2: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobalV2 ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobalV2 = prisma;
