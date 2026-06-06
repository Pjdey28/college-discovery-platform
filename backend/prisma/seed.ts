import { faker } from "@faker-js/faker";
import prisma from "../src/config/db";

async function main() {

  for (let i = 0; i < 300; i++) {

    const college = await prisma.college.create({
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
    await prisma.cutoff.create({
  data:{
    exam:"JEE",

    rank:
      faker.number.int({
        min:1000,
        max:100000
      }),

    collegeId:
      college.id,
  }
});
await prisma.placement.create({

  data:{

    highestPackage:
      faker.number.float({
        min:8,
        max:60
      }),

    averagePackage:
      faker.number.float({
        min:4,
        max:20
      }),

    placementRate:
      faker.number.float({
        min:60,
        max:100
      }),

    recruiters:
      [
        "Google",
        "Microsoft",
        "Amazon",
        "Adobe",
        "Oracle",
      ]
      .sort(
        ()=>0.5-Math.random()
      )
      .slice(0,3),

    collegeId:
      college.id
  }
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
  