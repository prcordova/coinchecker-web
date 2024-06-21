"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [pathname]); // Recheque o login status ao mudar de rota

  const styles = {
    activeLink: "border-b-2 border-[goldenrod] text-white",
    link: "text-white",
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("subscriptionId");
    localStorage.removeItem("user-subscription-storage");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className="">
      <div className="w-full flex justify-between items-center text-[0.8rem] sm:text-[1.5rem] flex-row p-4 sm:p-5 m-auto max-w-[1200px]">
        <div className="w-[20%] md:w-[30%]">
          <Link
            href={"/"}
            className=" text-[0.8rem] sm:text-[1.5rem] font-bold"
          >
            Coin<span className="text-[goldenrod] font-bold">Checker</span>
          </Link>
        </div>
        <div className="flex w-[70%] md:w-[60%] gap-1 sm:gap-3 justify-between items-center">
          <Link
            href={"/"}
            className={
              (pathname === "/" ? styles.activeLink : styles.link,
              "hidden sm:block")
            }
          >
            Home
          </Link>
          <Link
            href={"/contact"}
            className={
              pathname === "/contact" ? styles.activeLink : styles.link
            }
          >
            Contact
          </Link>
          <Link
            href={"/about"}
            className={pathname === "/about" ? styles.activeLink : styles.link}
          >
            About
          </Link>
          <Link
            href={"/download"}
            className={
              pathname === "/download" ? styles.activeLink : styles.link
            }
          >
            Download
          </Link>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-white border border-none sm:border-white px-1 sm:px-4 py-2 rounded hover:bg-white hover:text-black"
            >
              Logout
            </button>
          ) : (
            <Link
              href={"/login"}
              className={
                pathname === "/login" ? styles.activeLink : styles.link
              }
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
