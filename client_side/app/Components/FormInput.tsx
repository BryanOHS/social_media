import React, { ChangeEvent, useEffect, useRef, useState } from "react";

interface props {
    label: string
    type:string
    name: string
    updateInfo: (e: ChangeEvent<HTMLInputElement>, key: string) => void;
}
const FormInput = ({ updateInfo, label, type , name}: props) => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <div className="w-fit flex flex-col mt-4 items-start">
      <label htmlFor={name} className={`uppercase transition-transform ml-2 font-bold ${active ? 'translate-y-0' : 'translate-y-10'}`}>
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={label}
        className={`h-[60px] w-[300px] bg-transparent border-white border-2 rounded-md pl-2`}
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
