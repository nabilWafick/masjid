import AboutSection from "@/components/ui/about-section";
import { PageHeader } from "@/components/ui/page-header";
import { FC } from "react";

interface AboutPageProps {}

const AboutPage: FC<AboutPageProps> = () => {
  return (
    <>
      <PageHeader title="A propos" description="Tout savoir sur la mosquée" />
      <div className="container py-12 ">
        <AboutSection
          isEver={0 % 2 === 0}
          title={"Notre mosquéee"}
          image={
            "https://images.unsplash.com/photo-1597734187998-e1931acfe2ed?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWFzamlkfGVufDB8fDB8fHww"
          }
          description={`Une mosquée est un lieu de culte où se rassemble la communauté musulmane pour les prières communes. Il s'agit du type de monument culturel le plus caractéristique de l'islam.

On ne trouve pas de règle définie dans le Coran sur ce que devrait être le lieu pour prier Allah, à l'exception de la qibla, à savoir la direction vers laquelle doit se tourner le fidèle pour accomplir la prière rituelle. L’ensemble architectural qui s'est développé au cours de l'histoire est en général flanqué d’une ou plusieurs tours appelées minarets, dont le nombre n'est pas limité. La salle de prière est souvent surmontée, complètement ou partiellement, par un dôme. C’est du haut d’un des minarets que le muezzin (mouadh-dhin) appelle à la prière au cours de l’adhan.`}
        />
        <AboutSection
          isEver={1 % 2 === 0}
          title={"Ses débuts"}
          image={
            "https://images.unsplash.com/photo-1594047543253-43f56592fe1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG1hc2ppZCUyMG1lZGluYXxlbnwwfHwwfHx8MA%3D%3D"
          }
          description={`Le modèle initial de la mosquée trouve sans doute ses sources dans l'aménagement de la maison du Prophète, à Médine. Par la suite, la forme des mosquées a évolué dans le temps et dans l'espace, et l'on relève trois grands types de plan: arabe (Maghreb, Égypte, Péninsule arabique, Proche Orient), iranien (Iran, Asie centrale, Afghanistan, Inde) et ottoman (Empire ottoman). Les mosquées contemporaines, à part quelques exceptions notables, reprennent souvent des adaptations historicisantes de ces modèles. Dans certaines régions (Chine, Inde, Indonésie), on trouve aussi des formes syncrétiques, qui mêlent ces grands modèles architecturaux à des formules architecturales locales.

`}
        />
        <AboutSection
          isEver={2 % 2 === 0}
          title={"La communauté"}
          image={
            "https://images.unsplash.com/photo-1512162056921-1a24bc5dd478?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG11c2xpbXMlMjBwcmF5aW5nfGVufDB8fDB8fHww"
          }
          description={`En 2015, le nombre de musulmans dans le monde est estimé à 1,8 milliard, soit 24 % de la population mondiale36. La diffusion de l'islam, hors du monde arabe, s'explique par la préférence communautaire, les migrations37 et le prosélytisme38. L'islam est aujourd'hui la religion ayant la plus forte croissance démographique39. D'après le Pew Research Center, si les tendances démographiques actuelles se poursuivent, l'islam pourrait dépasser le christianisme et devenir la première religion au monde d'ici 207040. Cette croissance rapide s'explique essentiellement par un taux de fécondité plus élevé permettant un rajeunissement de la population41.

L'islam est la seule religion dont le nom figure dans la désignation officielle de plusieurs États, sous la forme de « République islamique ». Il s'agit alors officiellement de la religion d'État42. Toutefois, ces républiques ne sont pas les seuls pays musulmans ayant décrété l'islam religion d’État. Plusieurs pays allient le droit des anciens pays colonisateurs au droit islamique.

`}
        />
      </div>
    </>
  );
};

export default AboutPage;
