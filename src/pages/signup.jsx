import Image from "next/image";
import CALogo from "public/ca-logo.svg";
import GoogleLogo from "public/google-logo.svg";
import GreenWaves from "@/components/GreenWaves";
import Link from "next/link";

/**
 * Sign up page
 *
 * @returns {React.ReactElement} The sign up page
 */
export default function Signup({ dogs }) {
  const onSubmitForm = async (event) => {
    event.preventDefault(true);

    const response = await signIn("credentials", {
      redirect: false,
      email: event.target.email.value,
      password: event.target.password.value,
    });

    if (response.error) {
      console.log(response.error);
    }
  };

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
          <h1 className="font-maven-pro font-medium pt-4 text-neutral-700 text-center">
            Educating the dogs who change the world
          </h1>
        </div>

        <div>
          <p className="mt-6 text-neutral-500 text-md text-center">
            Already have an account?{" "}
            <Link className="underline" href="login">
              Sign in
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
