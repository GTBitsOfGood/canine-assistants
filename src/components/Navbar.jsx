import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";

export default function Navbar() {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  return (
    <div className="flex h-20 bg-foreground items-center justify-start gap-4">
      <Link href="/">
        <div className="px-10">Logo</div>
      </Link>

      <Link
        href="/dogs"
        className={
          "flex flex-col justify-center w-fit h-full border-b-4 border-ca-green " +
          (currentPage == "Dashboard"
            ? "border-opacity-100"
            : "border-opacity-0")
        }
        onClick={() => setCurrentPage("Dashboard")}
      >
        <div className="text-center text-primary-text text-lg font-semibold px-3">
          Dashboard
        </div>
      </Link>

      <Link
        href="/account"
        className={
          "flex flex-col justify-center w-fit h-full border-b-4 border-ca-green " +
          (currentPage == "Account" ? "border-opacity-100" : "border-opacity-0")
        }
        onClick={() => setCurrentPage("Account")}
      >
        <div className="text-center text-primary-text text-lg font-semibold px-3">
          Account
        </div>
      </Link>

      <Link
        href="/"
        className={
          "flex flex-col justify-center w-fit h-full border-b-4 border-ca-green " +
          (currentPage == "User Management"
            ? "border-opacity-100"
            : "border-opacity-0")
        }
        onClick={() => setCurrentPage("User Management")}
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
