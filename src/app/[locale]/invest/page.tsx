"use client";

import { DonationForm } from "@/components/donation/donation-form";
import { DonationProgress } from "@/components/donation/donation-progress";
import { PageHeader } from "@/components/ui/page-header";

export default function InvestirPage() {
  return (
    <div className="min-h-screen bg-background">
      <PageHeader
        title="Investir dans votre mosquée"
        description="Participez au développement et à l'entretien de votre lieu de culte"
      />

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <DonationProgress
              current={150000}
              target={500000}
              donorsCount={324}
            />

            <div className="container lg:pl-7">
              <h3 className=" font-semibold mb-2">Pourquoi investir ?</h3>
              <p className="font-medium mb-1">Votre contribution permet de :</p>
              <ul className="text-sm list-disc list-inside">
                <li>Maintenir et améliorer les installations</li>
                <li>Soutenir les activités éducatives</li>
                <li>Développer de nouveaux projets communautaires</li>
                <li>Assurer le fonctionnement quotidien de la mosquée</li>
              </ul>
            </div>
          </div>

          <div>
            <DonationForm />
          </div>
        </div>
      </div>
    </div>
  );
}
