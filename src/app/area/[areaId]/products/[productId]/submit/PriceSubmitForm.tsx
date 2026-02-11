"use client";

import { useActionState } from "react";
import { submitPrice } from "./actions";
import { trackEvent } from "@/lib/analytics";

interface Props {
  productId: string;
  areaId: string;
  stores: { id: string; name: string; chainName: string }[];
}

export function PriceSubmitForm({ productId, areaId, stores }: Props) {
  const [state, formAction, isPending] = useActionState(
    async (
      _prev: { error?: string; success?: boolean } | undefined,
      formData: FormData
    ) => {
      const result = await submitPrice(formData);
      if (result?.success) {
        trackEvent("price_submitted", { productId, areaId });
      }
      return result;
    },
    undefined
  );

  if (state?.success) {
    return (
      <div className="bg-primary-light rounded-xl p-6 text-center">
        <p className="text-2xl mb-2">&#10003;</p>
        <p className="text-primary-dark font-semibold">投稿ありがとうございます!</p>
        <p className="text-sm text-primary-dark mt-1">
          価格情報が更新されました
        </p>
        <a
          href={`/area/${areaId}/products/${productId}`}
          className="inline-block mt-4 bg-primary text-white px-6 py-2 rounded-full text-sm hover:bg-primary-dark"
        >
          価格比較に戻る
        </a>
      </div>
    );
  }

  return (
    <form action={formAction} className="grid gap-4">
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="areaId" value={areaId} />

      {state?.error && (
        <div className="bg-red-50 text-danger text-sm p-3 rounded-lg">
          {state.error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">店舗を選択</label>
        <select
          name="storeId"
          required
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
        >
          <option value="">店舗を選んでください</option>
          {stores.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          価格（税込・円）
        </label>
        <input
          type="number"
          name="price"
          required
          min={1}
          max={99999}
          placeholder="例: 198"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
      >
        {isPending ? "投稿中..." : "価格を投稿する"}
      </button>
    </form>
  );
}
