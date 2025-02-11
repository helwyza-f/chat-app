"use client";
import React from "react";
import ConvexClientProvider from "@/provider/ConvexClientProvider";
type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return <ConvexClientProvider>{children}</ConvexClientProvider>;
}
