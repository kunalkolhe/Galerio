import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@photoluts.com' },
    update: {},
    create: {
      email: 'admin@photoluts.com',
      name: 'Admin User',
      password_hash: adminPassword,
      role: 'ADMIN',
    },
  });
  console.log('Admin user created:', admin.email);

  // Create initial categories
  const categories = ['Portrait LUTs', 'Cinematic LUTs', 'Wedding LUTs', 'B&W LUTs'];
  for (const name of categories) {
    await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name, description: `High quality ${name}` },
    });
  }
  console.log('Categories created!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
