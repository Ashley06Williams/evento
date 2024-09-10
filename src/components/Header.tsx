"use client";

import Link from "next/link";
import Logo from "./Logo";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const routes = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "All Events",
    path: "/events/all",
  },
];

export default function Header() {
  const activePathname = usePathname();
  return (
    <header className="flex items-center justify-between border-b border-white/10 h-14 px-3 sm:px-9">
      <Logo />

      <nav className="h-full">
        <ul className="flex gap-x-6 h-full text-sm">
          {routes.map((routes) => (
            <li
              key={routes.path}
              className={cn(
                " hover:text-white flex items-center relative transition ",
                {
                  "text-white": activePathname === routes.path,
                  "text-white/50": activePathname !== routes.path,
                }
              )}
            >
              <Link href={routes.path}>{routes.name}</Link>

              {activePathname === routes.path ? (
                <motion.div
                  layoutId="header-active-link"
                  className="bg-accent h-1 w-full absolute bottom-0"
                ></motion.div>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
