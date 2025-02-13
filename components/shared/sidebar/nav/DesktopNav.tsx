"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ThemeToogle } from "@/components/ui/theme/theme-toogle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigation } from "@/hooks/useNavigation";
import { SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import Link from "next/link";

const DesktopNav = () => {
  const paths = useNavigation();

  return (
    <Card className="hidden lg:flex-col lg:flex lg:justify-between lg:items-center lg:h-full lg:w-16 lg:px-2 lg:py-4">
      <nav>
        <ul className="flex flex-col items-center gap-4">
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
                      <Badge className="absolute left-6 bottom-7 px-2">
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
        </ul>
      </nav>
      <div className="flex flex-col items-center gap-4">
        <ThemeToogle />
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <UserButton />
      </div>
    </Card>
  );
};

export default DesktopNav;
