import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Check if admin user already exists
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@nntts.com' },
  });

  if (!existingAdmin) {
    // Hash the password
    const hashedPassword = await hash('adminnntts', 12);

    // Create admin user
    await prisma.user.create({
      data: {
        email: 'admin@nntts.com',
        name: 'Admin User',
        emailVerified: new Date(),
        password: hashedPassword,
      },
    });
    
    console.log('Admin user created successfully!');
  } else {
    console.log('Admin user already exists');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
