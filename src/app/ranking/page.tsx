import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { RankingClient } from "./RankingClient";

export const dynamic = "force-dynamic";

export default async function RankingPage() {
  const areas = await prisma.area.findMany();
  const area = areas[0]; // MVP: single area
  if (!area) {
    return <p className="text-center text-gray-400 mt-8">エリアがありません</p>;
  }

  const stores = await prisma.store.findMany({
    where: { areaId: area.id },
  });

  // Calculate average price per store (latest price per product)
  const storeScores = await Promise.all(
    stores.map(async (store) => {
      const latestPrices = await prisma.price.findMany({
        where: { storeId: store.id },
        orderBy: { postedAt: "desc" },
        distinct: ["productId"],
      });

      const totalProducts = latestPrices.length;
      const avgPrice =
        totalProducts > 0
          ? latestPrices.reduce((sum, p) => sum + p.price, 0) / totalProducts
          : 0;

      return {
        storeId: store.id,
        storeName: store.name,
        chainName: store.chainName,
        avgPrice: Math.round(avgPrice),
        productCount: totalProducts,
      };
    })
  );

  storeScores.sort((a, b) => a.avgPrice - b.avgPrice);

  return (
    <div>
      <div className="mb-4">
        <Link href="/" className="text-sm text-primary hover:underline">
          &larr; トップに戻る
        </Link>
        <h1 className="text-xl font-bold mt-1">今日のおすすめ店舗</h1>
        <p className="text-sm text-gray-500">
          {area.prefecture} {area.city} の総合最安ランキング
        </p>
      </div>

      <RankingClient stores={storeScores} areaId={area.id} />
    </div>
  );
}
