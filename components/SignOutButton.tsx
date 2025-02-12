"use client";
import { useRouter } from "next/navigation";
import { useClerk } from "@clerk/nextjs";

const SignOutButton = () => {
  const router = useRouter();
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    router.push("/public"); // Redirect ke halaman utama
    await signOut(); // Sign out dari Clerk
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOutButton;
