"use client";

import React, { useState } from "react";
import Logo from "./Logo";
import { motion } from "framer-motion";

const Header = ({ user, selectedTab, setSelectedTab }: any) => {
  const tabs = ["home", "products", "categories"];

  return (
    <div className="flex w-full gap-8 h-full  text-black justify-start items-end">
      <Logo />
      <ul className="w-full flex flex-row justify-start items-center h-full gap-4 italic">
        {tabs.map((item, index) => (
          <li
            key={index}
            className={
              item === selectedTab
                ? " pointer-events-none px-1 font-normal text-secondary font-sleek"
                : "px-1 rounded cursor-pointer font-normal text-secondary font-sleek"
            }
            onClick={() => setSelectedTab(item)}
          >
            {` ${item}`}
            {item === selectedTab ? (
              <motion.div
                className="px-1 rounded-xl border-b-2 border-primary w-full"
                layoutId="underline"
              />
            ) : null}
          </li>
        ))}
      </ul>

      <div className="text-xl font-bold text-primary font-sleek w-full justify-end items-end flex flex-col ">
        <a
          href="/api/auth/signout"
          className="text-sm font-normal text-secondary font-sleek italic"
        >
          Sign out
        </a>
        <h2 className="capitalize">
          <span className="text-secondary">Hello,</span> {user.name}
        </h2>
      </div>
    </div>
  );
};

export default Header;
