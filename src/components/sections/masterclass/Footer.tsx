"use client";

import Image from "next/image";
import Link from "next/link";
import { getVersion } from "@/lib/data/masterclassCopy";

export default function Footer() {
  const f = getVersion().footer;
  return (
    <footer data-footer-legal className="relative z-10 border-t mc-border mc-section py-10 px-6 sm:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Logo & Copyright */}
        <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
          <Link href="/" className="flex items-center group">
            {/* White-text logo */}
            <Image
              src="/brand/logo-full-white.png"
              alt="AD Media Solution"
              width={140}
              height={40}
              className="logo-dark-bg h-8 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity"
            />
            {/* Dark-text logo */}
            <Image
              src="/brand/logo-full.png"
              alt="AD Media Solution"
              width={140}
              height={40}
              className="logo-light-bg h-8 w-auto object-contain opacity-70 group-hover:opacity-100 transition-opacity"
            />
          </Link>
          <p className="text-xs text-muted-foreground/60 mt-2">
            {f.copyright}
          </p>
        </div>

        {/* Right Side: Links */}
        <div className="flex gap-6 text-xs text-muted-foreground/60">
          {f.links.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-primary transition-colors">
              {link.label}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
