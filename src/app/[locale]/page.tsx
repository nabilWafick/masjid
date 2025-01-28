"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  // const { t } = useTranslation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white">
        <div
          className="absolute inset-0 bg-coverN bg-center z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=1920&auto=format&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <div className="relative z-10 text-center space-y-4 container">
          <h1 className="text-4xl md:text-6xl font-bold">
            Assalamou Anleykoum
          </h1>
          <p className="text-xl md:text-2xl">Masjid Dare SALAM</p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <Link href={""}>
              <Card className="p-6 space-y-4">
                <h3 className="text-lg font-medium">Horaires des prières</h3>
                <p className="text-muted-foreground text-sm">
                  Consultez les horaires des prières quotidiennes et du
                  vendredi.
                </p>
              </Card>
            </Link>

            <Link href={""}>
              <Card className="p-6 space-y-4">
                <h3 className="text-lg font-medium">Événements</h3>
                <p className="text-muted-foreground text-sm">
                  Découvrez nos activités et événements à venir.
                </p>
              </Card>
            </Link>

            <Link href={""}>
              {" "}
              <Card className="p-6 space-y-4">
                <h3 className="text-lg font-medium">Communauté</h3>
                <p className="text-muted-foreground text-sm">
                  Rejoignez notre communauté dynamique et participez à nos
                  activités.
                </p>
              </Card>
            </Link>

            <Link href={""}>
              <Card className="p-6 space-y-4">
                <h3 className="text-lg font-medium">Aumône</h3>
                <p className="text-muted-foreground text-sm">
                  Faites un don pour contribuer aux dépenses et l'entretien de
                  la mosquée.
                </p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-xl font-bold mb-4">Notre Mosquée</h2>
              <p className="text-muted-foreground mb-6 text-sm">
                La Mosquée du Dare SALAM est un lieu de culte et de
                rassemblement pour la communauté musulmane d'Abomey-Calavi. Nous
                offrons un espace accueillant pour la prière, l'apprentissage et
                le partage.
              </p>
              <Button variant="link" className="p-0">
                <Link href={"/mosque"}>En savoir plus</Link>
              </Button>
            </div>
            <div className="relative h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1519915212116-7cfef71f1d3e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fG1vc3F1ZXxlbnwwfHwwfHx8MA%3D%3D"
                alt="Intérieur de la mosquée"
                className="rounded-lg object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
