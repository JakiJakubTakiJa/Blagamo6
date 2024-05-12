import Link from "next/link";
import React from "react";
import { Button } from "@radix-ui/themes";

const LinkButton = ({
  href,
  color,
  full,
  children,
}: {
  href: string;
  color?:
    | "gray"
    | "gold"
    | "bronze"
    | "brown"
    | "yellow"
    | "amber"
    | "orange"
    | "tomato"
    | "red"
    | "ruby"
    | "crimson"
    | "pink"
    | "plum"
    | "purple"
    | "violet"
    | "iris"
    | "indigo"
    | "blue"
    | "cyan"
    | "teal"
    | "jade"
    | "green"
    | "grass"
    | "lime"
    | "mint"
    | "sky";
  full?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Link href={href} className="items-center gap-2">
      <Button color={color} style={full ? { width: "100%" } : undefined}>
        {children}
      </Button>
    </Link>
  );
};

export default LinkButton;
