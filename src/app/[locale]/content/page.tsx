import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { File } from "lucide-react";
import Image from "next/image";
import { FC } from "react";
import { FaEnvelope, FaFacebook, FaLink } from "react-icons/fa";

const ContentPage: FC = () => {
  const news = {
    id: 1,
    title: "Ramadan 1446H",
    date: "2024-03-10",
    image:
      "https://images.unsplash.com/photo-1614061811858-dde54a522f5e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmFtYWRhbiUyMGZvb2R8ZW58MHx8MHx8fDA%3D",
    excerpt: `Le ramadan est un moment important pour les musulmans qui respectent les injonctions de la tradition. Il apporte des changements significatifs dans le quotidien des croyants : les repas sont planifiés autour des heures de jeûne, avec le Suhur (repas pré-aube) avant le lever du soleil et l'Iftar (rupture du jeûne) après le coucher du soleil.\n

Quand débute le mois du ramadan ? C'est la question que tous les musulmans suivant le jeûne se posent chaque année. Et souvent est mise en avant une incertitude sur la manière de fixer la date, qui change tous les ans. La date du début du ramadan est encore indicative, mais on sait tout de même quand les musulmans doivent se préparer au jeûne.

Le premier jour du ramadan de l'année 2025 devrait être aux alentours du samedi 1er mars en France

Cette date du début du ramadan 2025 est donné à partir de la méthode dite scientifiques. Les dates du mois de ramadan (neuvième mois de l'année selon la tradition islamique) peuvent, en effet, être connues à l'avance grâce aux calculs astronomiques qui anticipent les phases lunaires et donc la nouvelle lune qui marque le début d'un nouveau mois. Pour le Conseil Théologique Musulman de France (CTMF), c'est même très clair : le mois de Ramadan 1446H débutera le samedi 1er mars 2025, puisque selon les calculs astronomiques extrêmement fiables, l'apparition du premier croissant lunaire le 28 février s'effectuera très précisément à 15h43 (heure de Paris) le 28 février.

Mais l'islam compte de nombreuses traditions dont celle de la Nuit du doute, qui confirme par l'observation de ciel et de la Lune le changement de mois et par conséquent le début et la fin du ramadan. Les fédérations musulmanes sont divisées quant à la méthode à utiliser pour établir de manière définitive les dates du ramadan, aussi la Grande Mosquée de Paris exige que la Lune soit aperçue dans le ciel. L'annonce de l'instance religieuse parisienne fait donc foi et est attendue de tous les musulmans de France chaque année. La Grande mosquée de Paris devrait organiser une "Nuit du doute" à la fin du mois de février.

Il est très vraisemblable qu'un consensus soit trouvé sur une date de début du ramadan autour du 28 février 2025. "La commission religieuse prendra en considération l'observation visuelle de la nouvelle lune sans exclure les résultats des calculs astronomiques", avait fait savoir la Grande mosquée de Paris l'an dernier.

En quoi consiste exactement la "Nuit du doute" ?
La méthode traditionnelle de la "Nuit du doute" a lieu à la Grande mosquée de Paris à deux reprises pour le ramadan, en amont et à la fin du mois de jeûne. L'institution réunit alors les fédérations musulmanes du pays pour une observation de la lune qui détermine l'entrée dans un nouveau mois conformément au calendrier lunaire. Si le croissant de lune (hilal) est aperçu par les musulmans dans le ciel, le mois de ramadan débute dès le lendemain, sinon il débute le surlendemain. Cette année, le nuit du doute devrait être fixée le vendredi 28 février.

On ne connaît ainsi les dates de début et de fin du mois de ramadan qu'au 29e jour du mois, en l'occurrence au 29e jour du mois de chaabane (huitième mois du calendrier religieux musulman) pour le début et le 29e jour du mois de ramadan lui même pour la fin. La Grande mosquée de Paris rappelle donc sur son site "qu'un décalage d'une journée est possible", à partir de la Nuit du doute, pour l'entrée dans le mois de ramadan. Il en va de même pour la fin du mois et l'entrée dans le mois suivant, synonyme de fin des privations. "Ce jour de décalage est dû à l'observation ou non du croissant de lune qui marque le début et la fin de chacun des douze mois qui composent le calendrier lunaire sur lequel s'appuie l'Islam".

Quand a lieu la fin du ramadan en France ?
La fête de l'Aïd el-Fitr est l'une des plus importante pour les musulmans pratiquants. Le mois de chawwal (dixième mois du calendrier musulman) débute précisément avec la fête de fin du jeûne de l'Aïd El Fitr. Chaque année, la rupture du jeûne est célébrée à cette occasion par les musulmans, entre amis, familles et proches de la famille et marquée par une prière importante le matin. Pour le Conseil Théologique Musulman de France (CTMF), la date de fin du ramadan est déjà fixée grâce à la méthode scientifique : le mois du jeûne prendra fin le dimanche 30 mars

En 2025, le denier jour du ramadan doit avoir aux alentours du 30 mars, l'Aïd doit avoir lieu aux alentours du lundi 31 mars

A noter qu'un autre événement a lieu ce week-end : la France passe à l'heure d'été le dimanche 30 mars. Le changement d'heure s'effectue donc le week-end de l'Aïd el-Fitr !

La omra constitue une forme de pèlerinage à la ville sainte de La Mecque (Arabie saoudite). A contrario du hajj, le grand pèlerinage, qui fait partie des cinq piliers de l'Islam, la omra n'est pas obligatoire. A noter également que si le hajj peut se faire uniquement lors du dernier mois de l'année musulmane, la omra est réalisable tout au long de l'année. Il est toutefois recommandé de la pratiquer pendant le mois de ramadan.

Quelles sont les deux méthodes pour fixer les dates du ramadan ?

Le calendrier musulman est fondé sur un calendrier lunaire : cela signifie que l'on change de mois à la nouvelle Lune. L'entrée dans le mois du ramadan comme sa fin et l'entrée dans le mois de chawwal dépendent donc de la nouvelle Lune. Mais il existe un conflit d'opinion entre ceux qui considèrent qu'il faut absolument voir l'astre dans le ciel et ceux qui font confiance à la science astronomique pour s'assurer que nous entrons bien dans un nouveau mois lunaire.

Les tenants de la méthode scientifique estiment que les calculs astronomiques sont fiables sur l'apparition de la Lune et que fixer à l'avance les dates de début et de fin du ramadan permet aux croyants d'organiser en amont leur abstinence, mais aussi les festivités de l'Aïd. Cela permettrait également d'unifier les dates du ramadan dans le monde entier.

Les tenants de la "tradition" considèrent que l'observation à l'oeil nu de la nouvelle Lune (le tout premier croissant de Lune) dans le ciel est indispensable, quels que soient les calculs scientifiques. Ce n'est que si la Lune est visible que l'on entre dans un nouveau mois lunaire.

La Commission théologique de la Grande Mosquée de Paris tente depuis 2022 un compromis et prend à la fois en considération l'observation de la Lune et "les résultats des travaux sur l'adoption du calcul scientifique et des données astronomiques universelles pour la détermination du début et de la fin du mois béni de Ramadan." Et de souligner qu'il s'agit de "deux méthodes complémentaires".

C'est quoi le ramadan ?
Le quatrième pilier de l'islam est respecté par de nombreux musulmans pratiquants en France : selon l'Insee, 5 millions de croyants pratiquent le ramadan chaque année dans l'Hexagone. Dans le monde, c'est plus de 1,5 milliard de personnes qui sont concernées. Au cours du mois du ramadan, les musulmans pratiquants observent le jeûne entre l'aube et le coucher du soleil.

Au-delà de l'abstinence de nourriture et de boisson du lever au coucher du soleil, ce mois est marqué par une multitude de traditions profondément enracinées qui ont pour but, selon l'islam, d'enrichir l'expérience spirituelle des croyants. Pour les musulmans pratiquants, ces traditions revêtent une grande importance, offrant une occasion précieuse de croissance spirituelle, de solidarité et de connexion avec leur foi.

Au cœur du Ramadan se trouve le jeûne, l'un des cinq piliers de l'islam. Ce pilier fondamental représente bien plus qu'une simple abstinence de nourriture et de boisson pendant les heures de clarté. Pour les musulmans pratiquants, le jeûne est un acte d'adoration et de dévotion envers Allah. C'est une période de purification physique et spirituelle, où les croyants s'efforcent de s'abstenir non seulement de nourriture et de boisson, mais aussi de comportements nuisibles tels que la colère, la calomnie et la médisance. Le jeûne offre une opportunité de renforcer sa volonté, sa patience et sa discipline, tout en se rapprochant -selon les croyants - davantage de Dieu à travers la privation temporaire des besoins matériels.

Pendant le Ramadan, la prière occupe une place prépondérante dans la vie des musulmans pratiquants. En plus des cinq prières obligatoires effectuées tout au long de l'année, les croyants consacrent une part significative de leur temps quotidien à la prière pendant ce mois béni. Les prières nocturnes spéciales appelées Tarawihs sont particulièrement importantes. Ces prières supplémentaires, souvent effectuées en congrégation à la mosquée, offrent une occasion précieuse de renforcer la connexion spirituelle avec Allah et de méditer sur les enseignements de l'islam. La lecture et la récitation du Coran sont également des pratiques essentielles du Ramadan, permettant aux croyants d'approfondir leur compréhension de leur foi et de trouver inspiration et réconfort dans les paroles sacrées de Dieu.

Une autre tradition essentielle du Ramadan est celle de la charité et du partage. Pendant ce mois, les musulmans pratiquants sont encouragés à être généreux envers les moins fortunés en donnant la charité et en organisant des repas pour les nécessiteux. Cette pratique incarne les valeurs de compassion et d'empathie au cœur de l'islam, renforçant les liens communautaires et offrant un soutien vital à ceux qui en ont besoin. De plus, le partage de repas avec la famille, les amis et les voisins crée un sentiment de camaraderie et de convivialité qui enrichit l'esprit du ramadan.

Enfin, la tradition culinaire du Ramadan joue un rôle central dans la célébration de ce mois béni. Les musulmans pratiquants anticipent avec enthousiasme les délicieuses spécialités culinaires qui agrémentent leurs repas de rupture du jeûne, connus sous le nom d'Iftar. Ces plats traditionnels varient selon les cultures et les régions, mais ils partagent tous le même objectif : réunir les familles et les communautés autour de la table pour partager un moment de joie et de gratitude après une journée de jeûne.

Qu'est-ce qu'une journée typique de Ramadan ?
Avant l'Aube : Suhoor - La journée commence bien avant l'aube avec un repas appelé "suhoor". C'est un moment crucial où les croyants consomment des aliments riches en protéines et en fibres pour fournir l'énergie nécessaire pour la journée de jeûne à venir. Il est dit dans les enseignements que le suhoor renforce le jeûneur pour accomplir son acte de dévotion. Ce repas est souvent partagé en famille ou en communauté, ajoutant ainsi une dimension sociale à la pratique du jeûne.
Du Lever du Soleil au Coucher du Soleil : Le Jeûne - Une fois que le soleil commence à se lever, les musulmans entament leur jeûne quotidien. Pendant cette période, qui dure du lever au coucher du soleil, les croyants s'abstiennent non seulement de nourriture et de boisson, mais aussi de tout comportement indésirable, tels que la colère, le mensonge ou la calomnie. Le jeûne est bien plus qu'une simple abstention physique ; il vise à purifier l'âme et à cultiver la patience, la compassion et la gratitude envers Dieu.
La Prière et la Réflexion - Tout au long de la journée, les musulmans croyants s'engagent dans une prière régulière et une lecture du Coran, le livre saint de l'islam. Ces pratiques spirituelles offrent une occasion de se recentrer sur la foi et de rechercher la proximité divine. De plus, le Ramadan est une période de réflexion, où les croyants évaluent leur vie, cherchent le pardon et renouvellent leurs intentions pour l'avenir.
La Pause du Jeûne : Iftar - Le coucher du soleil annonce la fin du jeûne quotidien, marquant le moment de rompre le jeûne avec un repas appelé "iftar". Cette rupture du jeûne est souvent réalisée en famille, en communauté ou même en invitant des voisins et des amis de différentes confessions à partager le repas. L'iftar est un moment de festivités, de gratitude et de générosité, où les croyants partagent leur nourriture avec ceux dans le besoin et renforcent les liens sociaux.
La Prière Tarawih - Après l'iftar, de nombreux musulmans se rendent à la mosquée pour participer à une prière spéciale appelée "Tarawih". Cette prière nocturne est une tradition du Ramadan et consiste en une série de prières supplémentaires effectuées en groupe. La Tarawih est une occasion de renforcer la spiritualité, de se réunir en communauté et de rechercher les bénédictions de Dieu.`,
  };

  return (
    <div className="container py-12 mt-20">
      <Card className="overflow-hidden shadow-md">
        <div className="relative h-72 w-full">
          <Image
            src={news.image}
            alt={news.title}
            className="object-cover w-full h-full"
          />
        </div>
        <CardHeader className="py-4' space-y-3' flex flex-row items-center space-x-5 ">
          <File className="fill-primary text-muted  " size={50} />
          <CardTitle className="text-2xl text-foreground">
            {news.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="">
          <p className="text-foreground text-sm  border-y border-foreground/25 py-7">
            {news.excerpt}
          </p>
          <span className=" w-full  flex justify-end items-end pt-5 pr-3 ">
            <div className=" flex justify-between items-center space-x-3">
              <p className="text-xs">Partagez l&apos;article :</p>
              <FaFacebook
                size={23}
                className=" text-primary hover:cursor-pointer"
              />
              <FaEnvelope
                size={23}
                className=" text-primary hover:cursor-pointer"
              />
              <FaLink
                size={23}
                className=" text-primary hover:cursor-pointer"
              />
            </div>
          </span>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContentPage;
