import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FC } from "react";

const NotFound: FC = () => {
  return (
    <div className="h-screen w-screen justify-center items-center bg-background text-foreground">
      <div>
        <p className="text-2xl">Oups!</p>
        <p className="text-lg my-10">Page non trouve</p>
        <Button variant={"link"}>
          <Link href={"/"}>Mosquée Dare SALAM</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
