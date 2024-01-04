import React from "react"
import Link from 'next/link'

const navs: {href:string,text:string}[] = [
    {
        href:"word",text:"查找文字"
    }
]

function NavItem({href,children}: {href:string,children:React.ReactNode})
{
    return (
        <Link href={href}>
            <div className={"relative w-full whitespace-nowrap px-3 py-2 inline-flex items-center" +
                " rounded-md bg-primary text-white justify-center"}>
                {children}
            </div>
        </Link>
    )
}

export default function menus()
{
    return (
        <div className="grid grid-cols-3 gap-4 w-full">
            {navs.map(({href,text}) => (
                <NavItem key={href} href={href}>
                    {text}
                </NavItem>
            ))}
        </div>
    )
}