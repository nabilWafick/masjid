import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "../ui/button";

export interface ProjectCardProps {
  title: string;
  date: string;
  image: string;
  description: string;
}

export function ProjectCard({
  title,

  image,
  description,
}: ProjectCardProps) {
  const params = useParams<{ locale: string }>();
  const local = params.locale;
  return (
    <Card className="overflow-hidden shadow-md dark:shadow-white/10">
      <div className="relative h-52 w-full">
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>
      <CardHeader className="py-4 space-y-3 flex justify-end">
        {/* <div className="text-sm text-primary font-medium text-end">
          {formatDate(date)}
        </div> */}
        <CardTitle className="">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3 text-sm">
          {description}
        </p>
        <div className=" border-t border-muted-foreground mt-7 pt-3  w-full  flex justify-between items-end ">
          <Button>
            <Link href={`/${local}/invest`}>Faire un don</Link>
          </Button>
          <Button variant={"link"} className="p-0">
            <Link href={`/${local}/projects/1`}>Continuez la lecture</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
