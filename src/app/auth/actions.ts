"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { hashSync, compareSync } from "bcryptjs";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const displayName = formData.get("displayName") as string;

  if (!email || !password || !displayName) {
    return { error: "全ての項目を入力してください" };
  }

  if (password.length < 6) {
    return { error: "パスワードは6文字以上で入力してください" };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: "このメールアドレスは既に登録されています" };
  }

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash: hashSync(password, 10),
      displayName,
    },
  });

  const session = await getSession();
  session.userId = user.id;
  session.displayName = user.displayName;
  session.email = user.email;
  await session.save();

  redirect("/");
}

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "メールアドレスとパスワードを入力してください" };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !compareSync(password, user.passwordHash)) {
    return { error: "メールアドレスまたはパスワードが正しくありません" };
  }

  const session = await getSession();
  session.userId = user.id;
  session.displayName = user.displayName;
  session.email = user.email;
  await session.save();

  redirect("/");
}

export async function logout() {
  const session = await getSession();
  session.destroy();
  redirect("/");
}
