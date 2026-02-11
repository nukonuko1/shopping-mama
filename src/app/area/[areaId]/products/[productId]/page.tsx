import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PriceComparisonClient } from "./PriceComparisonClient";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ areaId: string; productId: string }>;
}

export default async function PriceComparisonPage({ params }: Props) {
  const { areaId, productId } = await params;

  const [area, product] = await Promise.all([
    prisma.area.findUnique({ where: { id: areaId } }),
    prisma.product.findUnique({
      where: { id: productId },
      include: { category: true },
    }),
  ]);

  if (!area || !product) notFound();

  const storeIds = (
    await prisma.store.findMany({
      where: { areaId },
      select: { id: true },
    })
  ).map((s) => s.id);

  // Get latest price per store (subquery: group by storeId, get latest)
  const latestPrices = await prisma.price.findMany({
    where: {
      productId,
      storeId: { in: storeIds },
    },
    orderBy: { postedAt: "desc" },
    include: { store: true },
    distinct: ["storeId"],
  });

  // Sort by price asc
  latestPrices.sort((a, b) => a.price - b.price);

  const cheapest = latestPrices[0];
  const now = new Date();
  const STALE_HOURS = 48;

  const pricesWithFreshness = latestPrices.map((p) => {
    const hoursAgo =
      (now.getTime() - new Date(p.postedAt).getTime()) / (1000 * 60 * 60);
    return {
      id: p.id,
      price: p.price,
      storeName: p.store.name,
      storeId: p.store.id,
      chainName: p.store.chainName,
      postedAt: p.postedAt.toISOString(),
      isStale: hoursAgo > STALE_HOURS,
    };
  });

  return (
    <div>
      <div className="mb-4">
        <Link
          href={`/area/${areaId}/products?category=${product.categoryId}`}
          className="text-sm text-primary hover:underline"
        >
          &larr; {product.category.name}一覧に戻る
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
        <p className="text-xs text-gray-400">{product.category.name}</p>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.unit}</p>

        {cheapest && (
          <div className="mt-3 bg-primary-light rounded-lg p-3">
            <p className="text-xs text-primary-dark font-medium">最安値</p>
            <p className="text-3xl font-bold text-primary-dark">
              &yen;{cheapest.price.toLocaleString()}
            </p>
            <p className="text-sm text-primary-dark">
              {cheapest.store.chainName}
            </p>
          </div>
        )}
      </div>

      <PriceComparisonClient
        prices={pricesWithFreshness}
        areaId={areaId}
        productId={productId}
        productName={product.name}
      />
    </div>
  );
}
