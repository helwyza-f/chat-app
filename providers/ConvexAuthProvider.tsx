"use client";
import LoadingLogo from "@/components/shared/LoadingLogo";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { Authenticated, AuthLoading, ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const convex_url = process.env.NEXT_PUBLIC_CONVEX_URL || "";
const convex = new ConvexReactClient(convex_url);

const ConvexAuthProvider = ({ children }: Props) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {children}
        {/* <Authenticated>{children}</Authenticated> */}
        {/* <AuthLoading>
          <LoadingLogo />
        </AuthLoading> */}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default ConvexAuthProvider;
