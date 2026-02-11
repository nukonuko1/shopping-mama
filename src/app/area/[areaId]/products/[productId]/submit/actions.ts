"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function submitPrice(formData: FormData) {
  const session = await getSession();
  if (!session.userId) {
    return { error: "ログインが必要です" };
  }

  const productId = formData.get("productId") as string;
  const storeId = formData.get("storeId") as string;
  const priceStr = formData.get("price") as string;

  if (!productId || !storeId || !priceStr) {
    return { error: "全ての項目を入力してください" };
  }

  const price = parseInt(priceStr, 10);
  if (isNaN(price) || price < 1 || price > 99999) {
    return { error: "有効な価格を入力してください (1〜99,999円)" };
  }

  await prisma.price.create({
    data: {
      productId,
      storeId,
      price,
      userId: session.userId,
    },
  });

  return { success: true };
}
