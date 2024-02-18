import client from "../src/libs/server/client";

async function seed({ model, amount }: { model: string; amount: number }) {
  console.log("seed production is start");
  const arr = Array.from(Array(500).keys());
  switch (model) {
    case "product": {
      console.log("product");
      arr.forEach(async (e, i) => {
        const newProduct = await client.product.create({
          data: {
            name: `상품 ${e}`,
            price: e * 100,
            user: { connect: { id: 1 } },
          },
        });
        console.log(newProduct);
        return;
      });

      return;
      break;
    }
  }
}

seed({ model: "product", amount: 500 })
  .then(async () => {
    await client.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await client.$disconnect();
    process.exit(1);
  });
