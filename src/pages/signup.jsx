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
import { Toast } from "@/components/Toast";

/**
 * Sign up page
 *
 * @returns {React.ReactElement} The sign up page
 */
export default function Signup({ dogs }) {
  const router = useRouter()
  // const onSubmitForm = async (event) => {
  //   event.preventDefault(true);

  //   const response = await signIn('signup', {
  //     email: event.target.email.value,
  //     password: event.target.password.value,
  //     name: event.target.firstName.value + " " + event.target.lastName.value,
  //     redirect: false
  //   });

  //   if (response && response.status === 200) {
  //     router.push('/dogs')
  //   } /* else {
  //     console.log(response)
  //   } */
  // }

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
  const onSubmit = async (data, e) => {
    console.log(data)
    e.preventDefault(true);
    try {
      const response = await signIn('signup', {
        email: data.email,
        password: data.password,
        name: data.name,
        redirect: false
      });
      if (response && response.status === 200) {
        router.push('/dogs')
        return
      } else {
        Toast({ success: false, message: response.error })
      }
    }
    catch (error) {
      Toast({ success: false, message: error.message })
    }
    // if (response && response.status === 200) {
    //   router.push('/dogs')
    //   return
    // } else {
    //   toast.custom(() => (
    //       <div className="h-12 px-6 py-4 rounded shadow justify-center items-center inline-flex bg-red-600 text-white text-lg font-normal">
    //         {response.message}
    //       </div>
    //     ));
    // }
  };
  

  return (
    <div className="h-screen flex flex-col items-center justify-between">
      <div className="w-screen flex flex-col items-center justify-evenly m-1 overflow-x-hidden">
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
            className={`textbox-base text-input ${errors.name ? "textbox-error mb-1" : "textbox-border mb-4"} w-full`}
          ></input>
          {errors.name && <div className="font-maven-pro text-primary-text font-normal text-lg flex items-center mb-1"><ExclamationCircleIcon className="h-8 w-8 pr-2"/>{errors.name.message}</div>}
          
          <input
            id="email"
            placeholder="Email Address"
            {...register("email")}
            type="text"
            className={`textbox-base text-input ${errors.email ? "textbox-error mb-1" : "textbox-border mb-4"} w-full`}
          ></input>
          {errors.email && <div className="font-maven-pro text-primary-text font-normal text-lg flex items-center mb-1"><ExclamationCircleIcon className="h-8 w-8 pr-2"/>{errors.email.message}</div>}

          <input
            id="password"
            placeholder="Password"
            {...register("password")}
            type="password"
            className={`textbox-base text-input ${errors.password ? "textbox-error mb-1" : "textbox-border mb-4"} w-full`}
          ></input>
          {errors.password && <div className="font-maven-pro text-primary-text text-lg font-normal flex items-center mb-1"><ExclamationCircleIcon className="h-8 w-8 pr-2"/>{errors.password.message}</div>}

          <input
            id="confirmPassword"
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            type="password"
            className={`textbox-base text-input ${errors.confirmPassword ? "textbox-error mb-1" : "textbox-border mb-4"} w-full`}
          ></input>
          {errors.confirmPassword && <div className="font-maven-pro text-primary-text text-lg font-normal flex items-center mb-1"><ExclamationCircleIcon className="h-8 w-8 pr-2"/>{errors.confirmPassword.message}</div>}

          <div className="flex  w-full justify-center">
            <button 
              className="button-base primary-button primary-button-text w-full mt-2 py-2"
              type="submit"
            >
              Sign Up
            </button>
          </div>

          <div className="pt-6 mx-2 border-b-solid border-b-2 border-[#1e1e1e]/30 leading-[0.1rem] text-center">
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
                  Toast({ success: false, message: error });
                }
              }}
              type="button"
              className="button-base bg-foreground border-black secondary-button-text w-full h-10 mt-6 py-3"
            >
              <div className="aspect-square h-4 relative mx-4">
                <Image src={GoogleLogo} alt="Google G logo" fill/>
              </div>
              Sign Up with Google
            </button>
          </div>
        </form>
        <div>
          <p className="mt-4 mb-1 text-tertiary-text opacity-70 font-medium text-lg text-center">
            Have an account?{" "}
            <Link className="font-bold cursor-pointer" href="login">
              Log in
            </Link>
          </p>
        </div>
        <GreenWaves />
      </div>

    </div>
  );
}

// Override layout with blank
Signup.getLayout = function getLayout(page) {
  return page;
};
