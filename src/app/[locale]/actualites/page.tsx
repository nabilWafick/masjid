"use client";

//import { useTranslation } from "react-i18next"
import { NewsCard } from "@/components/news/news-card";
import { PageHeader } from "@/components/ui/page-header";

export default function NewsPage() {
  // const { t } = useTranslation()

  const news = [
    {
      id: 1,
      title: "Ramadan 2024",
      date: "2024-03-10",
      image:
        "https://images.unsplash.com/photo-1564683214965-3619addd900d?q=80&w=800&auto=format&fit=crop",
      excerpt:
        "Préparation pour le mois sacré du Ramadan 2024. Programme des prières et des activités.",
    },
    {
      id: 2,
      title: "Cours d'arabe",
      date: "2024-03-05",
      image:
        "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?q=80&w=800&auto=format&fit=crop",
      excerpt:
        "Nouveaux horaires pour les cours d'arabe. Inscriptions ouvertes pour tous les niveaux.",
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
    </div>
  );
}
