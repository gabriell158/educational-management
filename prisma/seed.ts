import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  let userRole = await prisma.role.findFirst({ where: { name: 'user' } });
  if (!userRole)
    userRole = await prisma.role.create({ data: { name: 'user' } });
  let adminRole = await prisma.role.findFirst({ where: { name: 'admin' } });
  if (!adminRole)
    adminRole = await prisma.role.create({ data: { name: 'admin' } });
  let adminUser = await prisma.user.findFirst({
    where: { firstName: 'admin' },
  });
  if (!adminUser)
    adminUser = await prisma.user.create({
      data: {
        firstName: 'admin',
        lastName: '',
        role: {
          connect: { id: adminRole.id },
        },
      },
    });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
