import Image from "next/image";
import CALogo from "public/ca-logo.svg";
import GoogleLogo from "public/google-logo.svg";
import GreenWaves from "@/components/GreenWaves";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/router'
import Link from "next/link";
import { Toast } from "@/components/Toast";
/**
 * Log in page
 *
 * @returns {React.ReactElement} The log in page
 */
export default function Login({ dogs }) {
  const router = useRouter()
  const onSubmitForm = async (event) => {
    event.preventDefault(true);

    const response = await signIn('credentials', {
      email: event.target.email.value,
      password: event.target.password.value,
      redirect: false
    });

    if (response && response.status === 200) {
      router.push('/dogs')
      return
    } else {
      console.log(response)
      Toast({
        success: false,
        message: response.error
      })
    }
  }

  return (
    <div className="font-maven-pro h-screen flex flex-col items-center justify-between">
      <div className="h-4/5 w-screen flex flex-col items-center justify-evenly m-1">
        <div className="flex items-center flex-col">
          <div className="h-[120px] aspect-[5/2] relative">
            <Image
              src={CALogo}
              priority={true}
              alt="Canine Assistants logo: cartoon dog on rightside of cartoon human"
              fill
            />
          </div>
          <h1 className="font-maven-pro font-medium pt-4 text-neutral-700 text-center">
            Educating the dogs who change the world
          </h1>
        </div>

        <form onSubmit={onSubmitForm} className="w-[25rem] pt-8 flex-col items-center justify-center">
          <label className="text-sm text-neutral-500" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            placeholder="Email"
            type="email"
            className="p-1 bg-secondary-background mb-4 w-full border-b-[2px]"
          ></input>

          <label className="text-sm text-neutral-500" htmlFor="email">
            Password
          </label>
          <input
            id="password"
            placeholder="Password"
            type="password"
            className="p-1 bg-secondary-background w-full border-b-[2px]"
          ></input>

          <div className="flex pt-8 w-full justify-center">
            <button className="bg-[#00886d] text-white shadow-sm rounded-full items-center mt-2 py-3 w-3/4">
              Sign In
            </button>
          </div>

          <div className="pt-6 mx-10 border-b-2 leading-[0.1rem] text-center">
            <span className="bg-secondary-background px-7 text-neutral-500">
              or
            </span>
          </div>
          <div className="w-full flex justify-center">
            <button
              onClick={() => signIn("google", { callbackUrl: "/dogs" })}
              type="button"
              className="w-3/4 bg-white rounded-full shadow-sm text-neutral-700 mt-6 py-3 flex flex-row items-center justify-center text-md"
            >
              <div className="aspect-square h-7 relative mx-4">
                <Image src={GoogleLogo} alt="Google G logo" fill/>
              </div>
              Sign in with Google
            </button>
            
          </div>
        </form>

        <div>
          <p className="mt-6 text-neutral-500 text-md text-center">
            Don&apos;t have an account?{" "}
            <Link className="underline" href="signup">
              Sign Up
            </Link>
          </p>
        </div>
      </div>

      <GreenWaves />
    </div>
  );
}

// Override layout with blank
Login.getLayout = function getLayout(page) {
  return page;
};
