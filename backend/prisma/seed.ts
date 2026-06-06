import { faker } from "@faker-js/faker";
import prisma from "../src/config/db";

async function main() {

  for (let i = 0; i < 300; i++) {

    await prisma.college.create({
      data: {
        name:
          faker.company.name() +
          " Institute",

        location:
          faker.location.city(),

        state:
          faker.location.state(),

        fees:
          faker.number.int({
            min: 50000,
            max: 500000,
          }),

        rating:
          faker.number.float({
            min: 3,
            max: 5,
            fractionDigits: 1,
          }),

        description:
          faker.lorem.paragraph(),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.log(e);

    await prisma.$disconnect();

    process.exit(1);
  });