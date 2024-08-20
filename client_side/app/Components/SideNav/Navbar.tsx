"use client";
import React from "react";
import NavLink from "./NavLink";
import { usePathname } from "next/navigation";
import Link from "next/link";
import GImage from "../../../public/images/solo_dark.png"
import { Roboto } from "next/font/google";
import Image from "next/image";
const Robotoo = Roboto({ subsets: ["latin"], weight: ["400", "900"] });

const Navbar = () => {

  const NavbarLinks = ['home', 'profile','notifications', 'saved']
  const pathname = usePathname()
  console.log(pathname)

  return (
    <nav className=" h-screen bg-black flex flex-col items-center py-10 col-span-4 relative">
        <Link href={"/"} className="text-5xl text-white tracking-wider uppercase font-bold">ANTI SOCIAL MEDIA</Link>
      <ul className={`w-[80%] ${Robotoo.className} h-full `}>
        {NavbarLinks.map((link) =>(
          <NavLink key={link} text={link} active={`/${link}` == pathname}/>
        ))}
        
      </ul>
      <Image src={GImage} width={1000} height={1000} alt="solo_girl" className="w-[300px] h-auto absolute bottom-0 right-0 opacity-50"/>
    </nav>
  );
};

export default Navbar;
