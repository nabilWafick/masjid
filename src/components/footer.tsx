import { Moon } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Moon className="h-6 w-6 text-green-600" />
              <span className="font-bold">Mosquée Dare SALAM</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Un lieu de paix, de prière et de communauté au cœur de la société
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <address className="text-sm text-muted-foreground not-italic">
              Qt. Cité la Victoire
              <br />
              Abomey-Calavi
              <br />
              Bénin
              <br />
              <Link href="tel:+33561404040" className="hover:text-foreground">
                +229 01
              </Link>
            </address>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Liens rapides</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
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

          <div>
            <h3 className="font-semibold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              {/* Add social media icons/links here */}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Mosquée du Mirail. Tous droits
            réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
