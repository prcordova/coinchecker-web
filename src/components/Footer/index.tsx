"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    <footer className="">
      <div className="w-full flex justify-between flex-col sm:flex-row items-center text-[0.8rem] sm:text-[1.5rem]  p-4 sm:p-5 m-auto max-w-[1200px]">
        <div className="w-[100%] md:w-[50%] flex  p-1 items-center justify-center sm:justify-start m-auto sm:m-0  ">
          <Link
            href={"/"}
            className=" text-[0.8rem] sm:text-[1.5rem] font-bold"
          >
            Coin<span className="text-[goldenrod] font-bold">Checker</span>
          </Link>
        </div>
        <div className="flex w-[70%] md:w-[60%] gap-1 sm:gap-3 justify-between items-center">
          {/* <Link
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
          </Link> */}
          <p className=" flex w-[100%] text-center m-auto justify-center flex-row">
            This project was made with <span>❤️</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
