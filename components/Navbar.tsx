"use client";

import navBarLinks from "@/constants";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
  return (
    <nav className=" flex border-b mb-5 px-5 h-14 items-center">
      <Container>
        <div className="flex justify-between">
          <div className="flex items-center space-x-6">
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </div>
          <LoginButton />
        </div>
      </Container>
    </nav>
  );
};

import React from "react";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Button, Container, Skeleton } from "@radix-ui/themes";

export const NavLinks = () => {
  const pathname = usePathname();
  return (
    <ul className="flex space-x-6">
      {navBarLinks.map((link) => (
        <li key={link.route}>
          <Link
            href={link.route}
            className={classNames({
              "text-zinc-900":
                link.route === pathname ||
                pathname.startsWith(`${link.route}/`),
              "text-zinc-500": link.route !== pathname,
              "hover:text-zinc-800 transition": true,
            })}
          >
            {link.Label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export const LoginButton = () => {
  return (
    <div className="flex items-center">
      <ClerkLoading>
        <SignedIn>
          <Skeleton height="30px" width="30px" />
        </SignedIn>
        <SignedOut>
          <Skeleton height="30px" width="70px" />
        </SignedOut>
      </ClerkLoading>
      <ClerkLoaded>
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <Button>
            <SignInButton />
          </Button>
        </SignedOut>
      </ClerkLoaded>
    </div>
  );
};

export default Navbar;
