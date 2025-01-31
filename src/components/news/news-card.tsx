"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";

export interface NewsCardProps {
  title: string;
  date: string;
  image: string;
  description: string;
}

export function NewsCard({ title, date, image, description }: NewsCardProps) {
  const params = useParams<{ locale: string }>();
  const local = params.locale;
  return (
    <Card className="overflow-hidden shadow-md dark:shadow-white/10">
      <div className="relative h-52 w-full">
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>
      <CardHeader className="py-4 space-y-3 flex justify-end">
        <div className="text-sm text-primary font-medium text-end">
          {formatDate(date)}
        </div>
        <CardTitle className="">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3 text-sm">
          {description}
        </p>
        <div className=" border-t border-muted-foreground mt-7 pt-2  w-full  flex justify-end items-end ">
          <Button variant={"link"} className="p-0">
            <Link href={`/${local}/news/1`}>Continuez la lecture</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
