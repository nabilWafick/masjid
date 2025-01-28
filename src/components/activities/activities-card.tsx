import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { cn } from "../../lib/utils";

interface ActivitiesCardProps {
  title: string;
  day: string;
  time: string;
  image: string;
  description: string;
}

export function ActivitiesCard({
  title,
  time,
  day,
  image,
  description,
}: ActivitiesCardProps) {
  return (
    <Card className="overflow-hidden shadow-md">
      <div className="relative h-52 w-full">
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>
      <CardHeader className="py-4 space-y-3 flex justify-end">
        <span className="text-lg text-foreground line-clamp-2">{day}</span>
        <CardTitle className="text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3 text-sm">
          {description}
        </p>
        <div className=" border-t border-muted-foreground mt-7 pt-3  w-full  flex justify-start items-end ">
          <Clock className={" text-primary mr-2"} />
          <p className=" line-clamp-2 text-sm text-foreground">{time}</p>
        </div>
      </CardContent>
    </Card>
  );
}
