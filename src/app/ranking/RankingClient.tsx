"use client";

import Link from "next/link";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

interface StoreScore {
  storeId: string;
  storeName: string;
  chainName: string;
  avgPrice: number;
  productCount: number;
}

interface Props {
  stores: StoreScore[];
  areaId: string;
}

const MEDAL = ["🥇", "🥈", "🥉"];

export function RankingClient({ stores, areaId }: Props) {
  useEffect(() => {
    trackEvent("ranking_viewed");
  }, []);

  return (
    <div className="grid gap-3">
      {stores.map((store, i) => (
        <Link
          key={store.storeId}
          href={`/area/${areaId}/stores/${store.storeId}`}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4 hover:shadow-md transition-shadow"
        >
          <span className="text-2xl w-10 text-center">
            {i < 3 ? MEDAL[i] : `${i + 1}位`}
          </span>
          <div className="flex-1">
            <p className="font-semibold">{store.storeName}</p>
            <p className="text-xs text-gray-400">
              {store.productCount}品目の平均価格
            </p>
          </div>
          <div className="text-right">
            <p
              className={`text-xl font-bold ${
                i === 0 ? "text-primary" : "text-gray-700"
              }`}
            >
              &yen;{store.avgPrice.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400">平均</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
