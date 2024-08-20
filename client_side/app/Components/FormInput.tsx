import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Roboto } from "next/font/google";
const Robotoo = Roboto({subsets: ["latin"], weight: ["400"]});
interface props {
    label: string
    type:string
    name: string
    updateInfo: (e: ChangeEvent<HTMLInputElement>, key: string) => void;
}
const FormInput = ({ updateInfo, label, type , name}: props) => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <div className="w-fit flex flex-col mt-2 items-start">
      <label htmlFor={name} className={`uppercase font-bold transition-transform ml-2 ${Robotoo.className} tracking-wide transition-all font-bold ${active ? 'translate-y-5 text-[12px]' : 'translate-y-12'}`}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        required
        id={name}
        className={`h-[60px] pt-3 w-[300px] bg-transparent text-xl border-white border-2 rounded-md pl-2 ${Robotoo.className}`}
        onChange={(e) => {
          updateInfo(e, label);
          setActive(e.target.value !== "");
        }}
        onFocus={() => setActive(true)}
        onBlur={(e) => setActive(e.target.value !== "")}
      />
    </div>
  );
};

export default FormInput;
