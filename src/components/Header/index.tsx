"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header() {
  const pathname = usePathname();
  const styles = {
    activeLink: "border-b-2 border-[goldenrod] text-white",
    link: "text-white",
  };

  return (
    <header className="">
      <div className="w-full flex justify-between items-center text-[1.5rem] flex-row p-5 m-auto max-w-[1200px]">
        <div className="w-[30%]">
          <Link href={"/"} className="text-2xl font-bold">
            Coin<span className="text-[goldenrod] font-bold">Checker</span>
          </Link>
        </div>
        <div className="flex w-[60%] gap-4 justify-between items-center">
          <Link
            href={"/"}
            className={pathname === "/" ? styles.activeLink : styles.link}
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
            href={"/support"}
            className={
              pathname === "/support" ? styles.activeLink : styles.link
            }
          >
            Support
          </Link>
        </div>
      </div>
    </header>
  );
}
