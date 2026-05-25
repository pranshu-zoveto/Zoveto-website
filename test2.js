const { PrismaClient } = require('./generated/client');
const prisma = new PrismaClient();

async function test() {
  try {
    const leads = await prisma.lead.findMany({
      include: {
        statusHistory: true,
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
