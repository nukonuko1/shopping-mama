import { PrismaClient } from "../src/generated/prisma/client.ts";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { hashSync } from "bcryptjs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "..", "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create area
  // Clear existing data
  await prisma.price.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.store.deleteMany();
  await prisma.area.deleteMany();
  await prisma.user.deleteMany();

  const setagaya = await prisma.area.create({
    data: { prefecture: "東京都", city: "世田谷区" },
  });

  // Create stores
  const storesData = [
    {
      name: "OKストア 世田谷店",
      chainName: "OKストア",
      address: "東京都世田谷区世田谷1-1-1",
      latitude: 35.6434,
      longitude: 139.6532,
    },
    {
      name: "西友 三軒茶屋店",
      chainName: "西友",
      address: "東京都世田谷区太子堂2-17-8",
      latitude: 35.6437,
      longitude: 139.6704,
    },
    {
      name: "ライフ 駒沢店",
      chainName: "ライフ",
      address: "東京都世田谷区駒沢2-16-1",
      latitude: 35.6335,
      longitude: 139.6615,
    },
    {
      name: "サミット 経堂店",
      chainName: "サミット",
      address: "東京都世田谷区経堂1-12-10",
      latitude: 35.6527,
      longitude: 139.6374,
    },
    {
      name: "まいばすけっと 下北沢店",
      chainName: "まいばすけっと",
      address: "東京都世田谷区北沢2-19-5",
      latitude: 35.6614,
      longitude: 139.6683,
    },
    {
      name: "業務スーパー 用賀店",
      chainName: "業務スーパー",
      address: "東京都世田谷区用賀4-5-16",
      latitude: 35.6276,
      longitude: 139.6342,
    },
  ];

  const stores = [];
  for (const s of storesData) {
    const store = await prisma.store.create({
      data: { ...s, areaId: setagaya.id },
    });
    stores.push(store);
  }

  // Create categories
  const categoriesData = [
    { name: "野菜", sortOrder: 1 },
    { name: "肉", sortOrder: 2 },
    { name: "魚", sortOrder: 3 },
    { name: "乳製品", sortOrder: 4 },
    { name: "飲料", sortOrder: 5 },
    { name: "日用食品", sortOrder: 6 },
  ];

  const categories: Record<string, string> = {};
  for (const c of categoriesData) {
    const cat = await prisma.category.create({ data: c });
    categories[c.name] = cat.id;
  }

  // Create products
  const productsData = [
    // 野菜
    { name: "キャベツ", unit: "1玉", categoryName: "野菜" },
    { name: "にんじん", unit: "1本", categoryName: "野菜" },
    { name: "たまねぎ", unit: "1個", categoryName: "野菜" },
    { name: "じゃがいも", unit: "1個", categoryName: "野菜" },
    { name: "もやし", unit: "1袋", categoryName: "野菜" },
    { name: "ほうれん草", unit: "1束", categoryName: "野菜" },
    { name: "トマト", unit: "1個", categoryName: "野菜" },
    { name: "きゅうり", unit: "1本", categoryName: "野菜" },
    // 肉
    { name: "鶏むね肉", unit: "100g", categoryName: "肉" },
    { name: "鶏もも肉", unit: "100g", categoryName: "肉" },
    { name: "豚こま切れ", unit: "100g", categoryName: "肉" },
    { name: "豚バラ", unit: "100g", categoryName: "肉" },
    { name: "合いびき肉", unit: "100g", categoryName: "肉" },
    { name: "牛こま切れ", unit: "100g", categoryName: "肉" },
    // 魚
    { name: "鮭切り身", unit: "1切", categoryName: "魚" },
    { name: "さば切り身", unit: "1切", categoryName: "魚" },
    { name: "しらす", unit: "1パック", categoryName: "魚" },
    // 乳製品
    { name: "牛乳", unit: "1L", categoryName: "乳製品" },
    { name: "卵", unit: "10個入", categoryName: "乳製品" },
    { name: "ヨーグルト", unit: "400g", categoryName: "乳製品" },
    { name: "バター", unit: "200g", categoryName: "乳製品" },
    { name: "スライスチーズ", unit: "1袋", categoryName: "乳製品" },
    // 飲料
    { name: "麦茶", unit: "2L", categoryName: "飲料" },
    { name: "コーラ", unit: "1.5L", categoryName: "飲料" },
    { name: "缶コーヒー", unit: "1本", categoryName: "飲料" },
    // 日用食品
    { name: "食パン", unit: "6枚切", categoryName: "日用食品" },
    { name: "豆腐", unit: "1丁", categoryName: "日用食品" },
    { name: "納豆", unit: "3パック", categoryName: "日用食品" },
    { name: "うどん", unit: "1袋", categoryName: "日用食品" },
    { name: "カレールー", unit: "1箱", categoryName: "日用食品" },
    { name: "醤油", unit: "1L", categoryName: "日用食品" },
    { name: "味噌", unit: "750g", categoryName: "日用食品" },
    { name: "サラダ油", unit: "1L", categoryName: "日用食品" },
    { name: "米", unit: "5kg", categoryName: "日用食品" },
    { name: "砂糖", unit: "1kg", categoryName: "日用食品" },
    { name: "塩", unit: "1kg", categoryName: "日用食品" },
  ];

  const products = [];
  for (const p of productsData) {
    const product = await prisma.product.create({
      data: {
        name: p.name,
        unit: p.unit,
        categoryId: categories[p.categoryName],
      },
    });
    products.push(product);
  }

  // Create a demo user for seed prices
  const demoUser = await prisma.user.create({
    data: {
      email: "demo@example.com",
      passwordHash: hashSync("password123", 10),
      displayName: "デモユーザー",
    },
  });

  // Generate realistic seed prices for each product at each store
  const basePrices: Record<string, number> = {
    キャベツ: 158, にんじん: 48, たまねぎ: 38, じゃがいも: 38,
    もやし: 29, ほうれん草: 168, トマト: 98, きゅうり: 58,
    鶏むね肉: 68, 鶏もも肉: 98, 豚こま切れ: 108, 豚バラ: 148,
    合いびき肉: 118, 牛こま切れ: 198, 鮭切り身: 198, さば切り身: 158,
    しらす: 198, 牛乳: 188, 卵: 228, ヨーグルト: 148,
    バター: 398, スライスチーズ: 198, 麦茶: 128, コーラ: 158,
    缶コーヒー: 88, 食パン: 138, 豆腐: 48, 納豆: 88,
    うどん: 28, カレールー: 198, 醤油: 248, 味噌: 298,
    サラダ油: 298, 米: 1980, 砂糖: 198, 塩: 98,
  };

  // Price variation per store (some stores are generally cheaper)
  const storeModifiers = [0.88, 0.95, 1.0, 0.97, 1.05, 0.85];

  for (let si = 0; si < stores.length; si++) {
    for (const product of products) {
      const base = basePrices[product.name] || 100;
      const modifier = storeModifiers[si];
      // Add some randomness (±10%)
      const randomFactor = 0.9 + Math.random() * 0.2;
      const finalPrice = Math.round(base * modifier * randomFactor);

      // Create price entries for today and a couple days ago
      await prisma.price.create({
        data: {
          productId: product.id,
          storeId: stores[si].id,
          price: finalPrice,
          userId: demoUser.id,
          postedAt: new Date(),
        },
      });
    }
  }

  console.log("Seed data created successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
