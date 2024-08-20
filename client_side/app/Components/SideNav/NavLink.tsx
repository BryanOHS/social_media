import React from 'react'
import Link from 'next/link'

interface NavLinkProps{
    text:string
    active:boolean
}
const NavLink = ({text, active}:NavLinkProps) => {
  return (
    <li className="relative w-fit my-3 py-2 group">
          <Link
            className={`relative text-3xl after:content-[''] after:block ${active ? "text-white" : "text-gray-500"}
                  after:absolute after:left-0 after:bottom-0 after:w-0 after:h-1 after:translate-y-1 
                  after:bg-white group-hover:after:w-[200px] group-hover:after:h-1 after:transition-all transition-all duration-300 uppercase`}
            href={text}
          >
            {text}
          </Link>
        </li>
  )
}

export default NavLink