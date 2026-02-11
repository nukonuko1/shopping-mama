import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { StoreDetailClient } from "./StoreDetailClient";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ areaId: string; storeId: string }>;
}

export default async function StoreDetailPage({ params }: Props) {
  const { areaId, storeId } = await params;

  const store = await prisma.store.findUnique({ where: { id: storeId } });
  if (!store) notFound();

  // Get cheapest products at this store
  const latestPrices = await prisma.price.findMany({
    where: { storeId },
    orderBy: { postedAt: "desc" },
    include: { product: { include: { category: true } } },
    distinct: ["productId"],
  });

  latestPrices.sort((a, b) => a.price - b.price);

  const priceData = latestPrices.map((p) => ({
    id: p.id,
    price: p.price,
    productName: p.product.name,
    productId: p.product.id,
    unit: p.product.unit,
    categoryName: p.product.category.name,
    postedAt: p.postedAt.toISOString(),
  }));

  return (
    <div>
      <div className="mb-4">
        <Link
          href={`/area/${areaId}/products`}
          className="text-sm text-primary hover:underline"
        >
          &larr; 商品一覧に戻る
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
        <p className="text-xs text-gray-400">{store.chainName}</p>
        <h1 className="text-xl font-bold">{store.name}</h1>
        <p className="text-sm text-gray-500 mt-1">{store.address}</p>
      </div>

      <StoreDetailClient
        store={{
          name: store.name,
          address: store.address,
          latitude: store.latitude,
          longitude: store.longitude,
        }}
        prices={priceData}
        areaId={areaId}
        storeId={storeId}
      />
    </div>
  );
}
