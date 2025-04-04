"use client";

//import React, { useEffect, useRef, useState } from "react";
//import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ClickOutside from "../ClickOutside";
import SidebarItem from "./SidebarItem";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ReactNode } from "react";
import {
  ActivitySquareIcon,
  LayoutDashboardIcon,
  ListTodo,
  LucideNewspaper,
  UserCheck,
  Users,
} from "lucide-react";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

export interface MenuItemGroup {
  name: string;
  menuItems: MenuItem[];
}

export interface MenuItem {
  icon: ReactNode;
  label: string;
  route: string;
  children: MItem[];
}

export interface MItem {
  label: string;
  route: string;
}

const menuGroups: MenuItemGroup[] = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: <LayoutDashboardIcon className="text-primary" />,
        label: "Dashboard",
        route: "/en/admin/dashboard",
        children: [],
      },
      {
        icon: <LucideNewspaper className="text-primary" />,
        label: "News",
        route: "/en/admin/news",
        children: [],
      },
      {
        icon: <ActivitySquareIcon className="text-primary" />,
        label: "Activities",
        route: "/en/admin/activities",
        children: [],
      },
      {
        icon: <ListTodo className="text-primary" />,
        label: "Projects",
        route: "/en/admin/projects",
        children: [],
      },
      {
        icon: <Users className="text-primary" />,
        label: "Users",
        route: "/en/admin/users",
        children: [],
      },
      {
        icon: <UserCheck className="text-primary" />,
        label: "Subscribers",
        route: "/en/admin/subscribers",
        children: [],
      },
    ],
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  //  const pathname = usePathname();
  const [pageName, setPageName] = useLocalStorage("selectedMenu", "dashboard");

  return (
    <ClickOutside onClick={() => setSidebarOpen(false)}>
      <aside
        className={`fixed left-0 top-0 z-9999 flex h-screen w-55 flex-col overflow-y-hidden bg-muted duration-300 ease-linear lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* <!-- SIDEBAR HEADER --> */}
        <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
          <Link href="/">
            {/* <Image
              width={176}
              height={32}
              src={"/images/logo/logo.svg"}
              alt="Logo"
              priority
            /> */}
            <h1 className="font-semibold">Mosquée Darou SALAM</h1>
          </Link>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {/* <!-- SIDEBAR HEADER --> */}

        <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
          {/* <!-- Sidebar Menu --> */}
          <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
            {menuGroups.map((group, groupIndex) => (
              <div key={groupIndex}>
                <h3 className="mb-4 ml-4 text-sm font-semibold text-primary">
                  {group.name}
                </h3>

                <ul className="mb-6 flex flex-col gap-1.5">
                  {group.menuItems?.map((menuItem, menuIndex) => (
                    <SidebarItem
                      key={menuIndex}
                      item={menuItem}
                      pageName={pageName}
                      setPageName={setPageName}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
    </ClickOutside>
  );
};

export default Sidebar;
