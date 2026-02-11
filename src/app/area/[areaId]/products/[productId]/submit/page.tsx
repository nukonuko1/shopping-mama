import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { PriceSubmitForm } from "./PriceSubmitForm";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ areaId: string; productId: string }>;
}

export default async function PriceSubmitPage({ params }: Props) {
  const { areaId, productId } = await params;

  const session = await getSession();
  if (!session.userId) {
    redirect(`/auth/login`);
  }

  const [product, stores] = await Promise.all([
    prisma.product.findUnique({
      where: { id: productId },
      include: { category: true },
    }),
    prisma.store.findMany({
      where: { areaId },
      orderBy: { name: "asc" },
    }),
  ]);

  if (!product) notFound();

  const storeOptions = stores.map((s) => ({
    id: s.id,
    name: s.name,
    chainName: s.chainName,
  }));

  return (
    <div>
      <div className="mb-4">
        <Link
          href={`/area/${areaId}/products/${productId}`}
          className="text-sm text-primary hover:underline"
        >
          &larr; {product.name}の価格比較に戻る
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-4">
        <p className="text-xs text-gray-400">{product.category.name}</p>
        <h1 className="text-xl font-bold">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.unit}</p>
      </div>

      <h2 className="text-lg font-semibold mb-3">価格を投稿する</h2>
      <p className="text-sm text-gray-500 mb-4">
        最新の価格を教えてください! みんなの投稿が家計を助けます
      </p>

      <PriceSubmitForm
        productId={productId}
        areaId={areaId}
        stores={storeOptions}
      />
    </div>
  );
}
