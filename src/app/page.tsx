import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Home() {
  const areas = await prisma.area.findMany({
    orderBy: { prefecture: "asc" },
  });

  return (
    <div>
      <section className="text-center py-8">
        <h1 className="text-2xl font-bold mb-2">
          お住まいのエリアを選んで
          <br />
          今日の最安値をチェック!
        </h1>
        <p className="text-sm text-gray-500">
          近所のスーパーの価格を比較して賢くお買い物
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">エリアを選択</h2>
        <div className="grid gap-3">
          {areas.map((area) => (
            <Link
              key={area.id}
              href={`/area/${area.id}/products`}
              className="block bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500">{area.prefecture}</span>
                  <p className="text-lg font-semibold">{area.city}</p>
                </div>
                <span className="text-primary text-2xl">&rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {areas.length === 0 && (
        <p className="text-center text-gray-400 mt-8">
          エリアデータがまだありません
        </p>
      )}
    </div>
  );
}
