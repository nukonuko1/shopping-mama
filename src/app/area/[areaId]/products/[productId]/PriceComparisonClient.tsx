"use client";

import Link from "next/link";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

interface PriceEntry {
  id: string;
  price: number;
  storeName: string;
  storeId: string;
  chainName: string;
  postedAt: string;
  isStale: boolean;
}

interface Props {
  prices: PriceEntry[];
  areaId: string;
  productId: string;
  productName: string;
}

export function PriceComparisonClient({
  prices,
  areaId,
  productId,
  productName,
}: Props) {
  useEffect(() => {
    trackEvent("price_comparison_viewed", { productId, productName });
  }, [productId, productName]);

  function formatDate(iso: string) {
    const d = new Date(iso);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const hour = d.getHours();
    const min = String(d.getMinutes()).padStart(2, "0");
    return `${month}/${day} ${hour}:${min}`;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">店舗別価格</h2>
        <Link
          href={`/area/${areaId}/products/${productId}/submit`}
          className="bg-primary text-white text-sm px-4 py-2 rounded-full hover:bg-primary-dark transition-colors"
        >
          価格を投稿する
        </Link>
      </div>

      <div className="grid gap-2">
        {prices.map((p, i) => (
          <Link
            key={p.id}
            href={`/area/${areaId}/stores/${p.storeId}`}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                  i === 0
                    ? "bg-accent text-white"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {i + 1}
              </span>
              <div>
                <p className="font-medium">{p.storeName}</p>
                <p className="text-xs text-gray-400">
                  {formatDate(p.postedAt)}
                  {p.isStale && (
                    <span className="ml-1 text-danger">
                      (48時間以上前の情報)
                    </span>
                  )}
                </p>
              </div>
            </div>
            <p
              className={`text-xl font-bold ${
                i === 0 ? "text-primary" : "text-gray-700"
              }`}
            >
              &yen;{p.price.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>

      {prices.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400 mb-3">まだ価格が投稿されていません</p>
          <Link
            href={`/area/${areaId}/products/${productId}/submit`}
            className="bg-primary text-white px-6 py-2 rounded-full inline-block hover:bg-primary-dark"
          >
            最初の価格を投稿する
          </Link>
        </div>
      )}
    </div>
  );
}
