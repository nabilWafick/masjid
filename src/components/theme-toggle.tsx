"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { FC, useEffect } from "react";

interface ThemeToggleProps {
  align?: "center" | "start" | "end";
}

const ThemeToggle: FC<ThemeToggleProps> = ({ align }) => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    theme === "dark" ? bodyClass.add(className) : bodyClass.remove(className);

    console.log(" ======> body class with dark", bodyClass.contains("dark"));
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon">
          <Sun
            className={`h-[1.2rem] w-[1.2rem]  transition-all duration-700 dark:-rotate-90 dark:scale-0 rotate-0 scale-100
            `}
          />
          <Moon
            className={`absolute h-[1.2rem] w-[1.2rem] transition-all duration-700 dark:rotate-0 dark:scale-100
                rotate-90 scale-0
           `}
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align ?? "center"}>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;
