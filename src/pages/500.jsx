import errorimage from "public/500-error.svg";
import Image from "next/image";
import { useRouter } from "next/router";

export default function Custom500() {
  const router = useRouter();

  return (
    <div class="flex flex-col justify-center content-center" style={{height: "90vh", width: "100%"}}>
      <div className="bg-white content-center shadow gap-4 flex rounded-lg text-start" style={{height: "74%", padding: "0px 103px", boxShadow: "0px 0px 16px 0px rgba(40, 48, 45, 0.16)"}}>
        <Image src={errorimage} width={314} style={{ marginRight: 54 }} />
        <div className="flex flex-col justify-center content-start">
        <p className="font-bold text-ca-pink not-italic leading-4" style={{fontSize: 200, lineHeight: 1}}>500</p>
        <p className="font-semibold text-4xl not-italic">Ruh-Roh. It looks like Fido is confused.</p>
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
