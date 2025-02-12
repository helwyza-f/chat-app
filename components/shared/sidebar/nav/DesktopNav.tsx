"use client";
import { Card } from "@/components/ui/card";
import { useNavigation } from "@/hooks/useNavigation";
import { usePathname } from "next/navigation";

const DesktopNav = () => {
  const paths = useNavigation();

  return <Card>Nav</Card>;
};

export default DesktopNav;
