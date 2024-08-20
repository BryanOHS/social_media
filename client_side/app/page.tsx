"use client";
import { useState } from "react";
import LoginForm from "./Components/LoginForm";
import MTBackground from "./Components/MTBackground";
import RegisterForm from "./Components/RegisterForm";
import Image from "next/image";
import BgImage from "../public/images/bg1.jpg";

import { Roboto } from "next/font/google";
const Robotoo = Roboto({ subsets: ["latin"], weight: ["400", "900"] });
export default function Home() {
  const [slideActive, setSlideActive] = useState<boolean>(false);

  return (
    <main className=" w-screen h-screen relative grid overflow-hidden">
      <Image
        src={BgImage}
        alt="Hejsan"
        layout="fill"
        objectFit="cover" // Or 'contain', depending on your use case
        quality={100} // Set quality to 100 (default is 75)
        className="absolute top-0 left-0"
      />
      <section className="w-[50%] h-[70%] translate-x-[32%]  -translate-y-20 bg-black rounded-md relative z-10 place-self-center grid grid-cols-2 text-white">
        <div
          className={`flex flex-col items-center p-5 w-1/2 h-full absolute rounded-md bg-red-800 z-20 transition-transform justify-center ${
            slideActive ? "" : "translate-x-full"
          }`}
          onClick={() => setSlideActive((prev) => !prev)}
        >
          <h1 className="text-5xl font-bold">WELCOME</h1>
          <p className={`text-center my-5 ${Robotoo.className}`}>
            Welcome to Anti Social Media. Here, we prioritize meaningful
            engagement over the noise of traditional platforms. Take a moment to
            connect with others in a space designed for thoughtful interaction
            and real conversations. Begin your journey today.
          </p>
          <button className={`text-3xl w-[200px] h-[60px] uppercase bold border-2 border-white rounded-md ${Robotoo.className} font-bold`}>
            {slideActive ? "Register" : "Login"}
          </button>
        </div>
        <div className="p-4 w-full h-full flex flex-col text-center justify-center">
          <h1 className="text-5xl uppercase font-bold tracking-wider">
            Register
          </h1>
          <RegisterForm />
        </div>
        <div className="p-4 w-full h-full flex flex-col text-center justify-center">
          <h1 className="text-5xl uppercase font-bold tracking-wider">Login</h1>

          <LoginForm />
        </div>
      </section>
    </main>
  );
}
