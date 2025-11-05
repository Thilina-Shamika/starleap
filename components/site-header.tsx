"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { useState, useEffect } from "react";

type MenuItem = { name: string; url: string; target?: string };

export function SiteHeader({ siteName = "Site", items = [], ctaText, ctaLink }: { siteName?: string; items?: MenuItem[]; ctaText?: string; ctaLink?: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="pointer-events-none fixed left-1/2 top-4 z-50 -translate-x-1/2">
        <div className="pointer-events-auto mx-auto flex h-12 items-center justify-between gap-4 rounded-full bg-black/40 px-4 text-white backdrop-blur supports-backdrop-filter:bg-black/30 sm:h-14 font-sans">
          <Link href="/" className="font-semibold tracking-tight">
            {siteName}
          </Link>
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/" className="px-3 py-2 text-white/90">
                    Home
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink href="/about" className="px-3 py-2 text-white/90">
                    About
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu" className="text-white hover:bg-white/10">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="pointer-events-none fixed left-1/2 top-4 z-50 -translate-x-1/2">
      <div className="pointer-events-auto mx-auto flex h-12 items-center justify-between gap-4 rounded-full bg-black/40 px-4 text-white backdrop-blur supports-backdrop-filter:bg-black/30 sm:h-14 font-sans">
        <Link href="/" className="font-semibold tracking-tight">
          {siteName}
        </Link>
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {items.map((it, i) => (
                <NavigationMenuItem key={i}>
                  <NavigationMenuLink href={it.url} target={it.target} className="px-3 py-2 text-white/90">
                    {it.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
              {ctaText && ctaLink && (
                <NavigationMenuItem>
                  <NavigationMenuLink href={ctaLink} className="ml-2 inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/30 via-purple-600/30 to-purple-500/30 border border-purple-500/30 text-white px-4 py-2 hover:from-purple-500/40 hover:via-purple-600/40 hover:to-purple-500/40">
                    {ctaText}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className="text-white hover:bg-white/10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-black/40 text-white backdrop-blur supports-backdrop-filter:bg-black/30 border-0">
              <SheetHeader>
                <SheetTitle className="text-base font-semibold">{siteName}</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 grid gap-2">
                {items.map((it, i) => (
                  <Link key={i} href={it.url} target={it.target} className="rounded-md px-3 py-2 hover:bg-white/10" onClick={() => setOpen(false)}>
                    {it.name}
                  </Link>
                ))}
                {ctaText && ctaLink && (
                  <Link href={ctaLink} className="mt-4 inline-flex items-center justify-center rounded-full px-4 py-2 text-white bg-gradient-to-r from-purple-500/30 via-purple-600/30 to-purple-500/30 border border-purple-500/30" onClick={() => setOpen(false)}>
                    {ctaText}
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}


