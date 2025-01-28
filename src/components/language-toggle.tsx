"use client";

import * as React from "react";
import { Languages } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FC } from "react";

interface LanguageToggleProps {
  align?: "center" | "start" | "end";
}

const LanguageToggle: FC<LanguageToggleProps> = ({ align }) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align ?? "center"}>
        <DropdownMenuItem onClick={() => router.push("/ar")}>
          العربية
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push("/fr")}>
          Français
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => router.push("/en")}>
          English
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
