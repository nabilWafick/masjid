"use client";

//import { useTranslation } from "react-i18next"
import { NewsCard } from "@/components/news/news-card";
import PageCounter from "@/components/ui/page-counter";
import { PageHeader } from "@/components/ui/page-header";

export default function NewsPage() {
  // const { t } = useTranslation()

  const news = [
    {
      id: 1,
      title: "Ramadan 2024",
      date: "2024-03-10",
      image:
        "https://images.unsplash.com/photo-1614061811858-dde54a522f5e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFtYWRhbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
      description:
        "Préparation pour le mois sacré du Ramadan 2024. Programme des prières et des activités ...",
    },
    {
      id: 2,
      title: "Hajj",
      date: "2025-03-05",
      image:
        "https://images.unsplash.com/photo-1511652019870-fbd8713560bf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDN8fGhhamp8ZW58MHx8MHx8fDI%3D",
      description:
        "Les conseils et recommendation pour bien effectuer le Hajj de l'année 1447H ...",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Actualités de votre mosquée"
        description="Restez informé des dernières nouvelles et événements"
      />

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <NewsCard key={item.id} {...item} />
          ))}
        </div>
      </div>

      <PageCounter className="" />
    </div>
  );
}
