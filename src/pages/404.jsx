import errorimage from "public/404-error.svg";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  return (
    <div class="flex flex-col justify-center content-center" style={{height: "90vh", width: "100%"}}>
      <div class="flex content-center bg-white gap-4 px-8 shadow rounded-lg text-start" style={{height: "74%", boxShadow: "0px 0px 16px 0px rgba(40, 48, 45, 0.16)"}}>
        <Image src={errorimage} width={544} />
        <div className="flex flex-col justify-center content-start">
          <p className="font-bold text-ca-pink not-italic leading-4" style={{fontSize: 200, lineHeight: 1}}>404</p>
          <p className="font-semibold text-4xl not-italic">Ruh-Roh. It looks like Fido got lost.</p>
          <button
            style={{width: 194}}
            className="bg-ca-pink text-white mt-5 px-2 py-3 rounded border border-ca-pink-shade justify-center items-center gap-4 flex"
            onClick={() => router.push("/dogs")}
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
