import SidebarWrapper from "@/components/shared/sidebar/SidebarWrapper";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function layout({ children }: Props) {
  return <SidebarWrapper>{children}</SidebarWrapper>;
}
