const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        statusHistory: {
          orderBy: { createdAt: "desc" },
        },
      },
    });
    console.log("SUCCESS. Leads:", leads.length);
  } catch (e) {
    console.error("PRISMA ERROR:", e.message);
  } finally {
    await prisma.$disconnect();
  }
}

test();
