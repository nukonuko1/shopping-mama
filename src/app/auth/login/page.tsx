"use client";

import Link from "next/link";
import { login } from "../actions";
import { useActionState } from "react";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(
    async (_prev: { error?: string } | undefined, formData: FormData) => {
      return await login(formData);
    },
    undefined
  );

  return (
    <div className="max-w-sm mx-auto mt-8">
      <h1 className="text-xl font-bold mb-6 text-center">ログイン</h1>

      <form action={formAction} className="grid gap-4">
        {state?.error && (
          <div className="bg-red-50 text-danger text-sm p-3 rounded-lg">
            {state.error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">メールアドレス</label>
          <input
            type="email"
            name="email"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">パスワード</label>
          <input
            type="password"
            name="password"
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          {isPending ? "ログイン中..." : "ログイン"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-4">
        アカウントをお持ちでない方は{" "}
        <Link href="/auth/signup" className="text-primary hover:underline">
          新規登録
        </Link>
      </p>
    </div>
  );
}
