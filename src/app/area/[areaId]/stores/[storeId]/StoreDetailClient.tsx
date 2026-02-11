"use client";

import Link from "next/link";
import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

interface PriceData {
  id: string;
  price: number;
  productName: string;
  productId: string;
  unit: string;
  categoryName: string;
  postedAt: string;
}

interface Props {
  store: {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
  };
  prices: PriceData[];
  areaId: string;
  storeId: string;
}

export function StoreDetailClient({ store, prices, areaId, storeId }: Props) {
  useEffect(() => {
    trackEvent("store_detail_viewed", { storeId, storeName: store.name });
  }, [storeId, store.name]);

  return (
    <div>
      {/* Map placeholder */}
      <div className="bg-gray-100 rounded-xl h-48 flex items-center justify-center mb-4 text-gray-400 text-sm">
        <div className="text-center">
          <p>📍 {store.address}</p>
          <p className="text-xs mt-1">
            {store.latitude.toFixed(4)}, {store.longitude.toFixed(4)}
          </p>
        </div>
      </div>

      <h2 className="text-lg font-semibold mb-3">
        この店舗の商品価格 ({prices.length}件)
      </h2>

      <div className="grid gap-2">
        {prices.map((p) => (
          <Link
            key={p.id}
            href={`/area/${areaId}/products/${p.productId}`}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div>
              <p className="font-medium text-sm">{p.productName}</p>
              <p className="text-xs text-gray-400">
                {p.categoryName} / {p.unit}
              </p>
            </div>
            <p className="text-lg font-bold text-primary">
              &yen;{p.price.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
