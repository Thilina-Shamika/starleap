"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "@/components/ui/sheet";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";
import { useState, useEffect } from "react";

export function SiteHeader({ siteName = "Site" }: { siteName?: string }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="pointer-events-none fixed left-1/2 top-4 z-50 -translate-x-1/2">
        <div className="pointer-events-auto mx-auto flex h-12 items-center justify-between gap-4 rounded-full bg-black/40 px-4 text-white backdrop-blur supports-backdrop-filter:bg-black/30 sm:h-14">
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
      <div className="pointer-events-auto mx-auto flex h-12 items-center justify-between gap-4 rounded-full bg-black/40 px-4 text-white backdrop-blur supports-backdrop-filter:bg-black/30 sm:h-14">
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
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className="text-white hover:bg-white/10">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <span className="text-base font-semibold">{siteName}</span>
              </SheetHeader>
              <nav className="mt-6 grid gap-2">
                <Link href="/" className="rounded-md px-3 py-2 hover:bg-muted" onClick={() => setOpen(false)}>
                  Home
                </Link>
                <Link href="/about" className="rounded-md px-3 py-2 hover:bg-muted" onClick={() => setOpen(false)}>
                  About
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}


