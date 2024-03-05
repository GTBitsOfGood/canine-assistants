import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Home() {
  const { data, loading, status } = useSession();
  console.log(status);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <h1>Canine Assistants</h1>
    </main>
  );
}
