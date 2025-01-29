"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { File } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FC } from "react";
import { FaEnvelope, FaFacebook, FaLink } from "react-icons/fa";

const ProjectContentPage: FC = () => {
  const project = {
    id: 1,
    title: "Finaliser la construction",
    date: "2024-03-10",
    image:
      "https://images.unsplash.com/photo-1555300873-660313ab1518?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fG1vc3F1ZXxlbnwwfHwwfHx8MA%3D%3D",
    description:
      "Finaliser la construction de la mosquée afin d'offrir plus d'espace et de comfort aux fidéles.",
  };

  return (
    <div className="container py-12 mt-20">
      <Card className="overflow-hidden shadow-md">
        <div className="relative h-72 w-full">
          <img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full"
          />
        </div>
        <CardHeader className="py-4' space-y-3' flex flex-row items-center space-x-5 ">
          <File className="fill-primary text-muted  " size={50} />
          <CardTitle className="text-2xl text-foreground">
            {project.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <p className="text-foreground text-sm  border-y border-foreground/25 py-7">
            {project.description}
          </p>
          <div className=" w-full  flex justify-between items-end pt-5 pr-3 ">
            <div className=" flex justify-between items-center space-x-3">
              <p className="text-xs">Partagez l&apos;article :</p>
              <Link href={`https://www.whatsapp.com`}>
                <FaFacebook
                  size={23}
                  className=" text-primary hover:cursor-pointer"
                />
              </Link>
              <Link href={`https://www.whatsapp.com`}>
                <FaEnvelope
                  size={23}
                  className=" text-primary hover:cursor-pointer"
                />
              </Link>
              <Link href={"https://www.youtube.com"}>
                <FaLink
                  size={23}
                  className=" text-primary hover:cursor-pointer"
                />
              </Link>
            </div>
            <Button>
              <Link href={`/invest`}>Faire un don</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectContentPage;
