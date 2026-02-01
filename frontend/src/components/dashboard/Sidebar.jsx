"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DBHomeIcon, BagIcon, UserGroupIcon } from "@/components/icons";

export default function Sidebar(){
  const pathname = usePathname();
  
  const menu = [
    {id: 'dashboard', icon: DBHomeIcon, label:'Dashboard', href: '/dashboard' },
    {id: 'job-opening', icon: BagIcon, label:'Job Opening', href: '/dashboard/job-opening' },
    // {id: 'candidates', icon: UserGroupIcon, label:'Candidates', href: '/dashboard/candidates' },
  ];

  return(
     <aside className="sticky top-0 h-screen w-72 bg-white shadow-md p-6 flex-shrink-0 overflow-y-auto">
      <div className="mb-8">
        <div className="flex ml-4 items-center gap-3">
          <div className="h-14 w-14">
            <img
              className="h-full w-full object-contain scale-150"
              src="/logo.svg"
              alt="Company Logo"
            />
          </div>
        </div>
      </div>
      
      <nav className="flex flex-col space-y-2">
        {menu.map((item) => {
          const IconComponent = item.icon;
          const isActive = pathname === item.href || (pathname?.startsWith(item.href) && item.href !== '/dashboard');
          
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-[20px] transition-colors 
                ${isActive 
                  ? 'bg-blue-800 text-white' 
                  : 'text-black hover:bg-gray-100 bg-white'
                }
              `}
            >
              <IconComponent 
                className="w-5 h-5 flex-shrink-0" 
                color={isActive ? "white" : "currentColor"}
              />
              <span className="text-body-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}