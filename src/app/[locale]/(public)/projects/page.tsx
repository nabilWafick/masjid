"use client";

//import { useTranslation } from "react-i18next"
import { ProjectCard } from "@/components/projects/projects-card";
import PageCounter from "@/components/ui/_page-counter";
import { PageHeader } from "@/components/ui/page-header";

export default function ProjectPage() {
  // const { t } = useTranslation()

  const projects = [
    {
      id: 1,
      title: "Finaliser la construction",
      date: "2024-03-10",
      image:
        "https://images.unsplash.com/photo-1555300873-660313ab1518?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTF8fG1vc3F1ZXxlbnwwfHwwfHx8MA%3D%3D",
      description:
        "Finaliser la construction de la mosquée afin d'offrir plus d'espace et de comfort aux fidéles ...",
    },
    {
      id: 2,
      title: "Toilettes",
      date: "2025-03-05",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyj4JA5i5tl_jiiKNYt1aG41hPbWIvKVIEPA&s",
      description:
        "Contruire des toilettes pour garentir l'hygiène et la propreté de la mosquée et des fidèles ...",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Nos Projets"
        description="Découvrez les projets de la mosquée"
      />

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((item) => (
            <ProjectCard key={item.id} {...item} />
          ))}
        </div>
      </div>

      <PageCounter className="" />
    </div>
  );
}
