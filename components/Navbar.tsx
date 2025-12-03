"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { Badge } from "./ui/badge";
import {useTotalqty } from "@/app/context/CardItemsContext";

export const Navbar = () => {
  const navLinks = [
    {
      title: "Home",
      href: "/",
      id: 1,
    },
    {
      title: "Stor",
      href: "/stor",
      id: 2,
    },
    {
      title: "Dashboard",
      href: "/dashboard",
      id: 3,
    },
    {
      title: "Order",
      href: "/order",
      id: 4,
    },
  ];

  const pathName = usePathname();
  const totalqtyCard = useTotalqty();

  return (
    <div className="border-b border-gray-500  shadow-lg p-4 px-30  mb-8 gap-4 flex items-center justify-between">
      <div className="gap-4 flex items-center">
        {navLinks.map((item) => {
          return (
            <Link
              key={item.id}
              href={item.href}
              className={pathName === item.href ? "underline" : ""}
            >
              {item.title}
            </Link>
          );
        })}
      </div>
      <div>
        <Link href="/shopping-cart " className="relative">
          <Badge className="absolute -top-2.5 left-5">{totalqtyCard}</Badge>
          <HiOutlineShoppingCart className="text-xl" />
        </Link>
      </div>
    </div>
  );
};
