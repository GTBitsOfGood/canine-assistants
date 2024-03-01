import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

import CALogo from "public/ca-logo.svg";
import GoogleLogo from "public/google-logo.svg";

import GreenWaves from "@/components/GreenWaves";
import { Toast } from "@/components/Toast";
/**
 * Log in page
 *
 * @returns {React.ReactElement} The log in page
 */
export default function Login({ dogs }) {
  const [ errors, setErrors ] = useState({ email: false, password: false });
  const router = useRouter();

  const onSubmitForm = async (event) => {
    event.preventDefault(true);

    if (event.target.email.value == "" || event.target.password.value == "") {
      return setErrors(() => {
        return {
          email: event.target.email.value == "",
          password: event.target.password.value == "",
        }
      });
    }

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
  const signInWithGoogle = async () => {
    const res = await signIn("google", { callbackUrl: "/dogs" });
    if (res && res.status === 200) {
      router.push('/dogs')
      return
    } else {
      console.log(res)
      Toast({
        success: false,
        message: res.error
      })
    }
  }

  return (
    <div className="font-maven-pro h-screen flex flex-col items-center justify-between">
      <div className="w-screen flex flex-col items-center justify-evenly m-1 mt-4">
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
          <h1 className="text-black font-bold mt-8">Log In</h1>
        </div>

        <form onSubmit={onSubmitForm} className="w-[25rem] pt-8 flex-col items-center justify-center">
          <input
            id="email"
            placeholder="Email"
            type="text"
            className={`textbox-base text-input ${errors.email ? "textbox-error mb-1" : "textbox-border mb-4"} w-full`}
            onChange={() => {
              return setErrors(() => { return { ...errors, email: false }});
            }}
          ></input>
          {errors.email && <div className="font-maven-pro text-primary-text font-normal text-lg flex items-center mb-1"><ExclamationCircleIcon className="h-8 w-8 pr-2"/>Please enter a valid email address</div>}

          <input
            id="password"
            placeholder="Password"
            type="password"
            className={`textbox-base text-input ${errors.password ? "textbox-error mb-1" : "textbox-border mb-4"} w-full`}
            onChange={() => {
              return setErrors(() => { return { ...errors, password: false }});
            }}
          ></input>
          {errors.password && <div className="font-maven-pro text-primary-text text-lg font-normal flex items-center mb-1"><ExclamationCircleIcon className="h-8 w-8 pr-2"/>Please enter a valid password</div>}

          <Link
            href=""
            className="text-tertiary-text text-opacity-70 text-xs font-bold underline pl-4"
          >Forgot Password?</Link>

          <div className="flex pt-8 w-full justify-center">
            <button type="submit" className="button-base primary-button primary-button-text w-full h-10">
              Log In
            </button>
          </div>

          <div className="h-[0px] pt-6 mx-10 border-b-2 leading-[0.1rem] text-center border-opacity-30 border-tertiary-text">
            <span className="bg-secondary-background px-7 text-neutral-500 font-medium">
              or
            </span>
          </div>

          <div className="w-full flex justify-center">
            <button
              onClick={() => signIn("google", { callbackUrl: "/dogs" })}
              type="button"
              className="button-base bg-foreground border-black secondary-button-text w-full h-10 mt-6 py-3"
            >
              <div className="aspect-square h-7 relative mx-4">
                <Image src={GoogleLogo} alt="Google G logo" fill/>
              </div>
              Sign in with Google
            </button>
            
          </div>
        </form>

        <div>
          <p className="mt-6 text-tertiary-text opacity-70 font-medium text-lg text-center">
            Don&apos;t have an account?{" "}
            <Link className="font-bold" href="signup">
              Sign Up
            </Link>
          </p>
        </div>

        <GreenWaves />
      </div>
    </div>
  );
}

// Override layout with blank
Login.getLayout = function getLayout(page) {
  return page;
};
