"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { GetStartedForm } from "@/components/get-started-form";
import { useState, useEffect } from "react";

type MenuItem = { name: string; url: string; target?: string };

export function SiteHeader({ siteName = "Site", items = [], ctaText, ctaLink }: { siteName?: string; items?: MenuItem[]; ctaText?: string; ctaLink?: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="pointer-events-none fixed left-1/2 top-4 z-50 -translate-x-1/2">
        <div className="pointer-events-auto mx-auto flex h-12 items-center justify-between gap-4 rounded-full bg-black/40 px-4 text-white backdrop-blur supports-backdrop-filter:bg-black/30 sm:h-14 font-sans md:min-w-[780px] lg:min-w-[920px] xl:min-w-[1100px]">
          <Link href="/" className="font-semibold tracking-tight">
            {siteName}
          </Link>
          <div className="hidden md:block">
            {ctaText && (
              <button
                onClick={() => setFormOpen(true)}
                className="inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/30 via-purple-600/30 to-purple-500/30 border border-purple-500/30 text-white px-4 py-2 hover:from-purple-500/40 hover:via-purple-600/40 hover:to-purple-500/40 transition-all"
              >
                {ctaText}
              </button>
            )}
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
      <div className="pointer-events-auto mx-auto flex h-12 items-center justify-between gap-4 rounded-full bg-black/40 px-4 text-white backdrop-blur supports-backdrop-filter:bg-black/30 sm:h-14 font-sans md:min-w-[780px] lg:min-w-[920px] xl:min-w-[1100px]">
        <Link href="/" className="font-semibold tracking-tight">
          {siteName}
        </Link>
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {isHomePage && items.map((it, i) => (
                <NavigationMenuItem key={i}>
                  <NavigationMenuLink href={it.url} target={it.target} className="px-3 py-2 text-white/90">
                    {it.name}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
              {ctaText && (
                <NavigationMenuItem>
                  <button
                    onClick={() => setFormOpen(true)}
                    className={isHomePage ? "ml-2 inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/30 via-purple-600/30 to-purple-500/30 border border-purple-500/30 text-white px-4 py-2 hover:from-purple-500/40 hover:via-purple-600/40 hover:to-purple-500/40 transition-all" : "inline-flex items-center rounded-full bg-gradient-to-r from-purple-500/30 via-purple-600/30 to-purple-500/30 border border-purple-500/30 text-white px-4 py-2 hover:from-purple-500/40 hover:via-purple-600/40 hover:to-purple-500/40 transition-all"}
                  >
                    {ctaText}
                  </button>
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
                {isHomePage && items.map((it, i) => (
                  <Link key={i} href={it.url} target={it.target} className="rounded-md px-3 py-2 hover:bg-white/10" onClick={() => setOpen(false)}>
                    {it.name}
                  </Link>
                ))}
                {ctaText && (
                  <button
                    onClick={() => {
                      setFormOpen(true);
                      setOpen(false);
                    }}
                    className={isHomePage ? "mt-4 inline-flex items-center justify-center rounded-full px-4 py-2 text-white bg-gradient-to-r from-purple-500/30 via-purple-600/30 to-purple-500/30 border border-purple-500/30 hover:from-purple-500/40 hover:via-purple-600/40 hover:to-purple-500/40 transition-all" : "inline-flex items-center justify-center rounded-full px-4 py-2 text-white bg-gradient-to-r from-purple-500/30 via-purple-600/30 to-purple-500/30 border border-purple-500/30 hover:from-purple-500/40 hover:via-purple-600/40 hover:to-purple-500/40 transition-all"}
                  >
                    {ctaText}
                  </button>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <GetStartedForm open={formOpen} onOpenChange={setFormOpen} />
    </header>
  );
}


