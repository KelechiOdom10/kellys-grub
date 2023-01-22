import * as bcrypt from "bcrypt";
import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import Product from "./productModel";
import Category from "./categoryModel";
import User from "./userModel";
import { customSlugify } from "../utils/slugify";

const url = "mongodb://localhost:27017/kellys-grub";

async function main() {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(url)
    .then(() => {})
    .catch(err => console.error(err));

  await Product.deleteMany();
  await Category.deleteMany();
  await User.deleteMany();

  let categories = [];

  for (let index = 0; index < 5; index++) {
    await User.create({
      fullName: `${faker.name.middleName("female")} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      password: await bcrypt.hash("password1234", 10),
    });
  }

  for (let index = 0; index < 10; index++) {
    const name = faker.commerce.department();
    let category = await Category.findOne({
      name,
    });

    if (!category) {
      category = await Category.create({
        name,
        slug: customSlugify(name),
        imageUrl: faker.image.food(),
      });
    }

    categories.push(category);
  }

  for (let index = 0; index < 20; index++) {
    const randomCategoryId = faker.helpers.arrayElement(categories)._id;
    const name = faker.commerce.productName();

    const product = await Product.create({
      name,
      slug: customSlugify(name),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(),
      imageUrl: faker.image.food(),
      category: randomCategoryId,
      onSale: faker.datatype.boolean(),
    });

    await Category.updateOne(
      { _id: randomCategoryId },
      { $push: { products: product._id } }
    );
  }
}

main()
  .catch(e => {
    console.log("Error seeding db", e);
    process.exit(1);
  })
  .finally(() => mongoose.disconnect());
