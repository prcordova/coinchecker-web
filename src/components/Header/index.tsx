"use client";
import Link from "next/link";
import React from "react";
export default function Header() {
  const styles = {
    activeLink: "text-blue-500",
    link: "text-black",
  };

  return (
    <header className="">
      <div className="w-full flex justify-between items-center flex-row p-4">
        <Link href={"/"} className={styles["activeLink"]}>
          <h1 className="text-2xl font-bold">CoinChecker</h1>
        </Link>
        <Link href={"/"} className={styles["activeLink"]}>
          Home
        </Link>
        <Link href={"/contact"} className={styles["activeLink"]}>
          contact
        </Link>
        <Link href={"/about"} className={styles["activeLink"]}>
          About
        </Link>
      </div>
    </header>
  );
}
