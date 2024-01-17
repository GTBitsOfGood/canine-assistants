import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";

export default function Custom404() {
  return (
    <>
      <div className="py-6 flex items-center">
        <ChevronLeftIcon className="w-4 mr-2" />
        <Link href="/dogs" className="text-lg text-secondary-text">
          Return to dashboard
        </Link>
      </div>
      <div className="flex flex-col items-center justify-center self-center text-center m-10">
        <div className="font-semibold text-5xl mb-4">404</div>
        <div className="text-2xl">This page does not exist!</div>
      </div>
    </>
  );
}
