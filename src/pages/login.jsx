import Image from "next/image";
import CALogo from "public/ca-logo.svg";
import GoogleLogo from "public/google-logo.svg";
import GreenWaves from "@/components/GreenWaves";
import { signIn } from "next-auth/react"
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
/**
 * Log in page
 *
 * @returns {React.ReactElement} The log in page
 */
export default function Login({ dogs }) {
  return (
    <div className="h-screen flex flex-col items-center justify-between">
      <div className="h-4/5 w-screen flex flex-col items-center justify-evenly m-1">
        <div className="flex items-center flex-col">
          <div className="h-[120px] aspect-[5/2] relative">
            <Image
              src={CALogo}
              alt="Canine Assistants logo: cartoon dog on rightside of cartoon human"
              layout="fill"
            />
          </div>
          <h1 className="pt-4 text-center">
            Educating the dogs who change the world
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h1 className="pb-4 font-bold">Log In</h1>
          <button onClick={() => signIn("google")} className="font-roboto text-tertiary-gray w-80 py-3 rounded-sm bg-white outline outline-black outline-1 flex flex-row items-center justify-center text-2xl">
            <div className="aspect-square h-7 relative mx-4">
              <Image src={GoogleLogo} alt="Google G logo" layout="fill" />
            </div>
            Log in with Google
          </button>
        </div>

        <div>
          <p className="text-tertiary-gray text-xl text-center">
            Don&apos;t have an account?{" "}
            <a className="font-bold" href="signup">
              Sign Up
            </a>
          </p>
        </div>
      </div>

      <GreenWaves/>
    </div>
  );
}

// Override layout with blank
Login.getLayout = function getLayout(page) {
  return page;
}

export async function getServerSideProps({ req, res }) {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: "/dogs"
      }
    }
  }
  return {
    props: {
      session
    }
  }
}