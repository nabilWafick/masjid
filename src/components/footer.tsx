import { FaFacebook, FaWhatsapp, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { cn } from "../lib/utils";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="w-full border-t bg-muted">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-medium mb-4">Contact</h3>
            <address className="text-xs text-muted-foreground not-italic">
              Qt. Cité la Victoire
              <br />
              Abomey-Calavi
              <br />
              Bénin
              <br />
              <Link href="tel:+33561404040" className="hover:text-foreground">
                00229 01524895
              </Link>
            </address>
          </div>

          <div>
            <h3 className="font-medium mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/prayer-times" className="hover:text-foreground">
                  Horaires des prières
                </Link>
              </li>
              <li>
                <a href="/activities" className="hover:text-foreground">
                  Activités
                </a>
              </li>
              <li>
                <Link href="/about" className="hover:text-foreground">
                  Investir
                </Link>
              </li>
            </ul>
          </div>

          <div className="">
            <h3 className="font-medium mb-4">Suivez-nous</h3>
            <div className="flex flex-col space-y-2 text-muted-foreground">
              <div className="flex space-x-3">
                <FaFacebook className="text-primary" />
                <p className="text-xs text">Facebook</p>
              </div>
              <div className="flex space-x-3">
                <FaWhatsapp className="text-primary" />
                <p className="text-xs text">Whatsapp</p>
              </div>
              <div className="flex space-x-3">
                <FaYoutube className="text-primary" />
                <p className="text-xs text">Youtube</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <span className="font-semibold text-primary ">
              Mosquée Dare SALAM
            </span>
            <p className="text-xs text-muted-foreground">
              Un lieu de paix, de prière et de communauté au cœur de la société
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center items-center my-10">
          <div className=" min-w-52 flex items-end space-x-2">
            <div>
              <p className=" text-xs text-muted-foreground mb-1">
                Abonnez-vous à notre newsletter
              </p>
              <Input placeholder="Votre mail" />
            </div>
            <Button>Je m'abonne</Button>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-xs text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Mosquée Dare SALAM. Tous droits
            réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
