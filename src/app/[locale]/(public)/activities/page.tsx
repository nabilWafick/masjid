"use client";

//import { useTranslation } from "react-i18next"
import { ActivitiesCard } from "@/components/activities/activities-card";
import { PageHeader } from "@/components/ui/page-header";
import PageCounter from "../../../components/ui/page-counter";

export default function ActivitiesPage() {
  // const { t } = useTranslation()

  const activities = [
    {
      id: 1,
      title: "Apprentissage du Coran",
      day: "Tous les jours",
      time: "Entre Soubh et Doha",
      image:
        "https://images.unsplash.com/photo-1624862761610-42fdfae9d20a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDB8fGNvcmFufGVufDB8fDB8fHwy",
      description:
        "Apprentissage de la lecture et de la mémorisation du Qur'an.",
    },
    {
      id: 2,
      title: "Prêche",
      day: "Jeudi et Dimanche",
      time: "Entre Maghrib et Ish'a",
      image:
        "https://images.unsplash.com/photo-1558617861-07ffd51a4782?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description:
        "Cours traitant des sujets relatifs à la foi et au dogme en Islam.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Activités de votre mosquée"
        description="Instruisez vous en participant aux activités de la mosquée"
      />

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((item) => (
            <ActivitiesCard key={item.id} {...item} />
          ))}
        </div>
      </div>

      <PageCounter className="" />
    </div>
  );
}
