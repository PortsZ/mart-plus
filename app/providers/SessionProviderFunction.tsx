"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";

const SessionProviderFunction = ({ children }: any) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderFunction;
