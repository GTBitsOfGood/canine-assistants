import Image from "next/image";
import CALogo from "public/ca-logo.svg";
import GreenWaves from "@/components/GreenWaves";
import GoogleLogo from "public/google-logo.svg";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/router'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/utils/consts";
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';
import toast from "react-hot-toast";

/**
 * Sign up page
 *
 * @returns {React.ReactElement} The sign up page
 */
export default function Signup({ dogs }) {
  const router = useRouter()
  const onSubmitForm = async (event) => {
    event.preventDefault(true);

    const response = await signIn('signup', {
      email: event.target.email.value,
      password: event.target.password.value,
      name: event.target.firstName.value + " " + event.target.lastName.value,
      redirect: false
    });

    if (response && response.status === 200) {
      router.push('/dogs')
    } /* else {
      console.log(response)
    } */
  }

  /**
   * Displays errors if sign-up form fields do not match Zod schema
   */
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ resolver: zodResolver(signUpSchema) });

  /**
   * 
   * Performs credential sign-up on sign-up form submit
   * Param data is the form field values
   */
  const onSubmit = (data) => {
    try {
      signIn("credentials", {email: data.email, password: data.password, redirect: false, callbackUrl: "/dogs" })
      if (onSubmit.error !== null) {
        toast.custom(() => (
          <div className="h-12 px-6 py-4 rounded shadow justify-center items-center inline-flex bg-red-600 text-white text-lg font-normal">
            You do not have access to the application. Please contact your manager to proceed.
          </div>
        ));
      } 
    } catch(error) {
      toast.custom(() => (
        <div className="h-12 px-6 py-4 rounded shadow justify-center items-center inline-flex bg-red-600 text-white text-lg font-normal">
          {error}
        </div>
      ));
    }
  };
  

  return (
    <div className="h-screen flex flex-col items-center justify-between">
      <div className="h-4/5 w-screen flex flex-col items-center justify-evenly m-1">
        <div className="flex items-center flex-col">
          <div className="h-[120px] aspect-[5/2] relative mt-3">
            <Image
              src={CALogo}
              alt="Canine Assistants logo: cartoon dog on rightside of cartoon human"
              layout="fill"
            />
          </div>
          <h1 className="font-maven-pro font-medium pt-5 text-neutral-700 text-center">
            Educating the dogs who change the world
          </h1>
          <h1 className="font-maven-pro font-bold pt-5 text-black text-center">
            Sign Up
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="w-[25rem] pt-8 flex-col items-center justify-center">
           
          <input
            id="name"
            placeholder="Name"
            {...register("name")}
            type="text"
            className= {errors.name ? "py-1 pr-1 pl-3 mb-1 rounded w-full border border-solid border-red-500 border-2 font-maven-pro": 
            "py-2 pr-1 pl-3 mb-4 rounded w-full border border-solid border-primary-gray border-1 font-maven-pro"}
          ></input>
          {errors.name && <div className="font-maven-pro text-black font-medium flex items-center"><ExclamationCircleIcon className="h-8 w-8 pr-2"/>{errors.name.message}</div>}
          
          <input
            id="email"
            placeholder="Email Address"
            {...register("email")}
            type="text"
            className={errors.email ? "py-1 pr-1 pl-3 mb-1 mt-1 rounded w-full border border-solid border-red-500 border-2 font-maven-pro": 
            "py-2 pr-1 pl-3 mb-4 rounded w-full border border-solid border-primary-gray border-1 font-maven-pro"}
          ></input>
          {errors.email && <div className="font-maven-pro text-black font-medium flex items-center"><ExclamationCircleIcon className="h-8 w-8 pr-2"/>{errors.email.message}</div>}

          <input
            id="password"
            placeholder="Password"
            {...register("password")}
            type="password"
            className={errors.password ? "py-1 pr-1 pl-3 mb-1 mt-1 rounded w-full border border-solid border-red-500 border-2 font-maven-pro": 
            "py-2 pr-1 pl-3 mb-4 rounded w-full border border-solid border-primary-gray border-1 font-maven-pro"}
          ></input>
          {errors.password && <div className="font-maven-pro text-black font-medium flex items-center"><ExclamationCircleIcon className="h-8 w-8 pr-2"/>{errors.password.message}</div>}

          <input
            id="confirmPassword"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            type="password"
            className={errors.confirmPassword ? "py-1 pr-1 pl-3 mb-1 mt-1 rounded w-full border border-solid border-red-500 border-2 font-maven-pro": 
            "py-2 pr-1 pl-3 mb-4 rounded w-full border border-solid border-primary-gray border-1 font-maven-pro"}
          ></input>
          {errors.confirmPassword && <div className="font-maven-pro text-black font-medium flex items-center"><ExclamationCircleIcon className="h-8 w-8 pr-2"/>{errors.confirmPassword.message}</div>}

          <div className="flex  w-full justify-center">
            <button 
              className="bg-[#a70c53] text-white shadow-sm rounded w-full items-center mt-2 py-2 text-sm"
              type="submit"
            >
              Sign Up
            </button>
          </div>

          <div className="pt-10 mx-2 border-b-solid border-b-2 border-[#1e1e1e]/30 leading-[0.1rem] text-center">
            <span className="bg-secondary-background px-2 text-neutral-500 font-medium">
              or
            </span>
          </div>
          <div className="w-full flex justify-center">
          <button
              onClick={() => {
                try {
                  signIn("google", { callbackUrl: "/dogs" })
                } catch (error) {
                  toast.custom(() => (
                    <div className="h-12 px-6 py-4 rounded shadow justify-center items-center inline-flex bg-red-600 text-white text-lg font-normal">
                      {error}
                    </div>
                  ));
                }
              }}
              type="button"
              className="w-full bg-white rounded-sm shadow-sm text-black mt-6 py-2 flex flex-row items-center justify-center text-sm font-medium border border-black border-2 border-solid"
            >
              <div className="aspect-square h-4 relative mx-4">
                <Image src={GoogleLogo} alt="Google G logo" fill/>
              </div>
              Sign Up with Google
            </button>
          </div>
        </form>
        <div>
          <p className="mt-6 text-neutral-500 font-medium text-md text-center">
            Have an account?{" "}
            <Link className="font-bold text-[#1e1e1e]/70 cursor-pointer underline" href="login">
              Log in
            </Link>
          </p>
        </div>
      </div>

      <GreenWaves />
    </div>
  );
}

// Override layout with blank
Signup.getLayout = function getLayout(page) {
  return page;
};
