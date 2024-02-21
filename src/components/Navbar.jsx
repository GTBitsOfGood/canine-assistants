import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import CALogo from "public/ca-logo-long.svg";
import { useRef } from "react";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import userpfpplaceholder from "public/userpfpplaceholder.svg";

export default function Navbar() {
  const { data: session, status } = useSession();
  const [userImage, setUserImage] = useState(userpfpplaceholder);
  const [userName, setUserName] = useState("User");
  const [userRole, setUserRole] = useState("User");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(router.pathname);

  useEffect(() => {
    fetch(`/api/users/${session?.user._id}`)
      .then((res) => res.json())
      .then((data) => {
        setUserImage(data?.data?.image);
        setUserName(data?.data?.name);
        setUserRole(data?.data?.role);
      });
  }, [session?.user]);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  useEffect(() => setCurrentPage(router.pathname), [router.pathname]);

  return (
    <div className="flex h-20 bg-foreground items-stretch justify-between gap-4">
      <div className="flex gap-4 items-center">
        <div className="pl-10">
          <Image
            src={CALogo}
            alt="Canine Assistants logo: cartoon dog on rightside of cartoon human"
            width={270}
          />
        </div>

        <Link
          href="/dogs"
          className={
            "flex flex-col justify-center w-fit h-full border-b-4 " +
            (currentPage == "/dogs" ? "border-ca-green " : "border-gray-400 ") +
            (currentPage == "/dogs"
              ? "border-opacity-100"
              : "border-opacity-0 hover:border-opacity-100")
          }
          onClick={() => setCurrentPage(router.pathname)}
        >
          <div className="text-center text-primary-text text-lg font-semibold px-3">
            Dogs
          </div>
        </Link>

        {(userRole === "Admin" || userRole === "Manager") && (
          <Link
            href="/users"
            className={
              "flex flex-col justify-center w-fit h-full border-b-4 " +
              (currentPage == "/users"
                ? "border-ca-green "
                : "border-gray-400 ") +
              (currentPage == "/users"
                ? "border-opacity-100"
                : "border-opacity-0 hover:border-opacity-100")
            }
            onClick={() => setCurrentPage(router.pathname)}
          >
            <div className="text-center text-primary-text text-lg font-semibold px-3">
              User Management
            </div>
          </Link>
        )}
      </div>

      <div className="relative mr-10" ref={dropdownRef}>
        <button
          onClick={toggleDropdown}
          className={
            "flex items-center justify-center h-full border-b-4 " +
            (isDropdownVisible ? "border-ca-green " : "border-gray-400 ") +
            (isDropdownVisible
              ? "border-opacity-100"
              : "border-opacity-0 hover:border-opacity-100")
          }
        >
          <div className="flex items-center justify-center">
            <div className="w-10 h-10 overflow-hidden rounded-full relative">
              <Image
                src={userImage || userpfpplaceholder}
                alt="Profile"
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <svg
              className="w-4 h-4 ml-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </button>

        {isDropdownVisible && (
          <div className="absolute right-0 mt-3 w-40 p-3 bg-white rounded-md shadow-lg z-20 text-center">
            <div className="flex justify-center pt-1 pb-1">
              <div className="w-16 h-16 overflow-hidden rounded-full border-2 border-gray-300">
                <Image
                  src={userImage || userpfpplaceholder}
                  alt="Profile"
                  width={64}
                  height={64}
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="text-center">
              <p className="text-md text-gray-700 text-black font-semibold">
                {userName}
              </p>
            </div>

          
            <Link href="/account">
              <button
                className={
                  "w-fit text-center px-4 py-2 pt-4 mb-4 font-bold text-sm text-gray-700 border-b-4 " +
                  (currentPage == "/account"
                    ? "border-ca-green "
                    : "border-gray-400 ") +
                  (currentPage == "/account"
                    ? "border-opacity-100"
                    : "border-opacity-0 hover:border-opacity-100")
                }
                onClick={toggleDropdown}
              >
                Settings
              </button>
            </Link>
            

            <button
              onClick={() => signOut()}
              className="w-full text-center px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
