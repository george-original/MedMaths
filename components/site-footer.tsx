import Link from "next/link"
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 mt-16 bg-muted/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-8">
          <div>
            <h3 className="font-semibold text-sm mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/calculators"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Calculators
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/disclaimer"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Medical Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Editorial Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-4">Data Protection</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Calculator inputs processed locally</li>
              <li className="text-sm text-muted-foreground">Not stored by us</li>
              <li className="text-sm text-muted-foreground">Formula references included</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 text-center">
          <div className="mb-4 flex justify-center">
            <Image src="/medmaths-logo.png" alt="MedMaths" width={40} height={40} className="h-10 w-10" />
          </div>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} MedMaths. All rights reserved.</p>
          <p className="text-xs text-muted-foreground mt-2">
            Contact us:{" "}
            <a href="mailto:medmaths.calc@gmail.com" className="text-primary hover:underline">
              medmaths.calc@gmail.com
            </a>
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            If this is a medical emergency, call your local emergency number immediately (e.g., 000 AU / 911 US / 112
            EU/UK) or go to your nearest emergency department.
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            MedMaths is not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
    </footer>
  )
}
