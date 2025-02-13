"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigation } from "@/hooks/useNavigation";
import { useConversation } from "@/hooks/useConversation";
import { SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Link from "next/link";
import { ThemeToogle } from "@/components/ui/theme/theme-toogle";
import { Badge } from "@/components/ui/badge";

const MobileNav = () => {
  const paths = useNavigation();

  const { isActive } = useConversation();

  if (isActive) return null;

  return (
    <Card className="fixed bottom-4 w-[calc(100%-32px)] flex items-center h-16 p-2 lg:hidden">
      <nav className="w-full">
        <ul className="flex justify-evenly items-center ">
          {paths.map((path, id) => (
            <li key={id} className="relative">
              <Link href={path.href}>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      size={"icon"}
                      variant={path.active ? "default" : "outline"}
                      className="w-10 h-10 p-1.5"
                      asChild
                    >
                      {path.icon}
                    </Button>
                    {path.count ? (
                      <Badge className="absolute left-7 bottom-6 px-2 ">
                        {path.count}
                      </Badge>
                    ) : null}
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{path.name}</p>
                  </TooltipContent>
                </Tooltip>
              </Link>
            </li>
          ))}
          <li>
            <ThemeToogle />
          </li>
          <li>
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <UserButton />
          </li>
        </ul>
      </nav>
    </Card>
  );
};

export default MobileNav;
