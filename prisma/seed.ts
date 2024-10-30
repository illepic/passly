import { db } from "../src/server/db";

async function main() {
  const id = 3;

  await db.post.upsert({
    where: { id },
    update: {},
    create: {
      id,
      name: "Hello, world!",
      createdById: "cm2rsjwec000013l6wbxnx2dh",
    },
  });
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
