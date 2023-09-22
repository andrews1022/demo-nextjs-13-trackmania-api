"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const RootErrorPage = () => {
  const router = useRouter();

  return (
    <div>
      <h1 className="text-4xl">Oops!</h1>
      <p>Something went wrong there. You can try refreshing the page, or go back home.</p>

      <button
        className="bg-teal-600 text-white mr-6 py-2 px-4"
        onClick={() => router.refresh()}
        type="button"
      >
        Refresh
      </button>

      <Link className="border-teal-600 border-2 py-2 px-4" href="/">
        Go Home
      </Link>
    </div>
  );
};

export default RootErrorPage;
