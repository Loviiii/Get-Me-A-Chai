"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();

  const [dropdown, setdropdown] = useState(false);
  return (
    <>
      <nav className=" flex flex-col md:flex-row justify-between items-center md:px-12 px-4 py-3 bg-[#031033] shadow-sm dark:bg-gray-800 text-white">
        <Link href={"/"}>
          <div className="pb-3 md:pb-0 flex justify-center md:justify-start items-end font-bold">
            <Image
              src="/gifs/chai.gif"
              alt="Network error"
              width={30}
              height={30}
              unoptimized
            />
            <span >Get Me A Chai</span>
          </div>
        </Link>
        <div className="flex gap-2 items-center">
          {session ? (
            <>
              <div className="flex items-center gap-5">
                <div className="relative inline-block text-left">
                  <button
                    onClick={() => setdropdown(!dropdown)}
                    onBlur={() => {
                      setTimeout(() => {
                        setdropdown(false);
                      }, 220);
                    }}
                    type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md text-white bg-gradient-to-r from-[#152a69] via-[#0b1d53] to-[#051238] hover:bg-gradient-to-br focus:outline-none p-2 cursor-pointer"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                  >
                    {session.user.email}
                    <svg
                      className="-mr-1 size-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      data-slot="icon"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div
                    className={`absolute ${
                      dropdown ? "" : "hidden"
                    } right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex="-1"
                  >
                    <div className="py-1" role="none">
                      <button
                        onClick={async () => {
                          setdropdown(false); // CLOSE DROPDOWN
                          await signOut({ callbackUrl: "/" }); // SIGN OUT and REDIRECT
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        role="menuitem"
                      >
                        Home
                      </button>
                      <button
                        onClick={async () => {
                          setdropdown(false); // CLOSE DROPDOWN
                          await signOut({ callbackUrl: "/about" }); // SIGN OUT and REDIRECT
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        role="menuitem"
                      >
                        About
                      </button>
                      <Link
                        href="/DashBoard"
                        className="block px-4 py-2 text-sm text-gray-700"
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-0"
                      >
                        DashBoard
                      </Link>
                      <Link
                        href={`/${session.user.name}`}
                        className="block px-4 py-2 text-sm text-gray-700 "
                        role="menuitem"
                        tabIndex="-1"
                        id="menu-item-1"
                      >
                        Your Page
                      </Link>
                      <button
                        onClick={async () => {
                          setdropdown(false); // CLOSE DROPDOWN
                          await signOut({ callbackUrl: "/" }); // SIGN OUT and REDIRECT
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        role="menuitem"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-white bg-gradient-to-r from-[#152a69] via-[#0b1d53] to-[#051238] hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link href={"/Login"}>
              <button
                type="button"
                className="text-white bg-gradient-to-r from-[#152a69] via-[#0b1d53] to-[#051238] hover:bg-gradient-to-br focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
