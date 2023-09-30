import Image from "next/image";
import waves from "public/waves.png";
import CALogo from "public/ca-logo.png";
import GoogleLogo from "public/google-logo.png";

/**
 * Login page
 *
 * @returns {React.ReactElement} The login page
 */
export default function Login({ dogs }) {
  return (
    <div className="h-screen flex flex-col items-center justify-between">
      <div className="h-4/5 w-screen flex flex-col items-center justify-evenly">
        <div className="flex items-center flex-col">
          <div className="h-[120px] aspect-[5/2] relative">
            <Image
              src={CALogo}
              alt="Canine Assistants logo: cartoon dog on rightside of cartoon human"
              layout="fill"
            />
          </div>
          <h1 className="pt-4">Educating the dogs who change the world</h1>
        </div>

        <div className="flex flex-col items-center justify-center">
          <h1 className="pb-4 font-bold">Log In</h1>
          <button className="font-roboto text-tertiary-gray px-32 py-3 rounded-sm bg-white outline outline-black outline-1 flex flex-row items-center justify-center text-2xl">
            <div className="aspect-square h-7 relative mx-4">
              <Image src={GoogleLogo} alt="Google G logo" layout="fill" />
            </div>
            Log in with Google
          </button>
        </div>

        <div>
          <p className="text-tertiary-gray text-xl">
            Don&apos;t have an account?{" "}
            <a className="font-bold" href="signup">
              Sign Up
            </a>
          </p>
        </div>
      </div>

      <div className="h-1/5 relative w-screen">
        <Image src={waves} alt="decorative green waves" layout="fill" />
      </div>
    </div>
  );
}
