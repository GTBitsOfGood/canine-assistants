import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(router.pathname);

  useEffect(() => setCurrentPage(router.pathname), [router.pathname]);

  return (
    <div className="flex h-20 bg-foreground items-center justify-start gap-4">
      <div className="px-10">Logo</div>

      <Link
        href="/dogs"
        className={
          "flex flex-col justify-center w-fit h-full border-b-4 border-ca-green " +
          (currentPage == "/dogs" ? "border-opacity-100" : "border-opacity-0")
        }
        onClick={() => setCurrentPage(router.pathname)}
      >
        <div className="text-center text-primary-text text-lg font-semibold px-3">
          Dashboard
        </div>
      </Link>

      <Link
        href="/account"
        className={
          "flex flex-col justify-center w-fit h-full border-b-4 border-ca-green " +
          (currentPage == "/account"
            ? "border-opacity-100"
            : "border-opacity-0")
        }
        onClick={() => setCurrentPage(router.pathname)}
      >
        <div className="text-center text-primary-text text-lg font-semibold px-3">
          Account
        </div>
      </Link>

      {/* TODO: udpate links with User Management page */}
      <Link
        href="/users"
        className={
          "flex flex-col justify-center w-fit h-full border-b-4 border-ca-green " +
          (currentPage == "/users" ? "border-opacity-100" : "border-opacity-0")
        }
        onClick={() => setCurrentPage(router.pathname)}
      >
        <div className="text-center text-primary-text text-lg font-semibold px-3">
          User Management
        </div>
      </Link>

      <button
        onClick={() => signOut()}
        className="flex flex-col justify-center w-fit h-full"
      >
        <div className="text-center text-primary-text text-lg font-semibold px-3 border-foreground border-b-4">
          Sign Out
        </div>
      </button>
    </div>
  );
}
