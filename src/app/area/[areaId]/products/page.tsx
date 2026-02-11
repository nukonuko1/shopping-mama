import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ areaId: string }>;
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ params, searchParams }: Props) {
  const { areaId } = await params;
  const { category } = await searchParams;

  const area = await prisma.area.findUnique({ where: { id: areaId } });
  if (!area) notFound();

  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
  });

  const selectedCategoryId = category || categories[0]?.id;

  const products = await prisma.product.findMany({
    where: { categoryId: selectedCategoryId },
    include: {
      prices: {
        orderBy: { price: "asc" },
        take: 1,
        include: { store: true },
      },
    },
  });

  // Filter prices to only stores in this area
  const storeIds = (
    await prisma.store.findMany({
      where: { areaId },
      select: { id: true },
    })
  ).map((s) => s.id);

  const productsWithAreaPrices = await Promise.all(
    products.map(async (product) => {
      const cheapestPrice = await prisma.price.findFirst({
        where: {
          productId: product.id,
          storeId: { in: storeIds },
        },
        orderBy: { price: "asc" },
        include: { store: true },
      });
      return { ...product, cheapestPrice };
    })
  );

  return (
    <div>
      <div className="mb-4">
        <Link href="/" className="text-sm text-primary hover:underline">
          &larr; エリア選択に戻る
        </Link>
        <h1 className="text-xl font-bold mt-1">
          {area.prefecture} {area.city}
        </h1>
      </div>

      {/* Category tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 -mx-4 px-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            href={`/area/${areaId}/products?category=${cat.id}`}
            className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              cat.id === selectedCategoryId
                ? "bg-primary text-white"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Product cards */}
      <div className="grid gap-3">
        {productsWithAreaPrices.map((product) => (
          <Link
            key={product.id}
            href={`/area/${areaId}/products/${product.id}`}
            className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-xs text-gray-400">{product.unit}</p>
              </div>
              <div className="text-right">
                {product.cheapestPrice ? (
                  <>
                    <p className="text-xl font-bold text-primary">
                      &yen;{product.cheapestPrice.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-400">
                      {product.cheapestPrice.store.chainName}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-gray-400">価格未登録</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {productsWithAreaPrices.length === 0 && (
        <p className="text-center text-gray-400 mt-8">
          この カテゴリの商品はまだありません
        </p>
      )}
    </div>
  );
}
