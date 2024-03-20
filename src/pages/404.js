import errorimage from "public/404-error.svg";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "93vh",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "74%",
          padding: "0px 32px",
          alignItems: "center",
          flexShrink: 0,
          backgroundColor: "white",
          gap: 16,
          boxShadow: "0px 0px 16px 0px rgba(40, 48, 45, 0.16)",
        }}
        className="bg-white shadow p-4 flex rounded-lg text-start"
      >
        <Image src={errorimage} width={544} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "flex-start",
          }}
        >
          <p
            style={{
              color: "#A70C53",
              fontWeight: 700,
              fontSize: 200,
              lineHeight: 1,
              fontStyle: "normal",
            }}
          >
            404
          </p>
          <p
            style={{
              fontSize: 40,
              fontWeight: 600,
              lineHeight: 1,
              fontStyle: "normal",
            }}
          >
            Ruh-Roh. It looks like Fido got lost.
          </p>
          <button
            style={{
              marginTop: "20px",
              width: 194,
              color: "white",
              padding: "10px 16px",
            }}
            className="bg-ca-pink rounded border border-ca-pink-shade justify-center items-center gap-4 flex"
            onClick={() => router.push("/dogs")}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
