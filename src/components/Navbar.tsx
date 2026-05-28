"use client";

import { useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/icons";
import { NAV_LINKS } from "@/data/content";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav
        className="border-b border-white/10 text-white h-nav fixed top-0 left-0 w-full z-50 backdrop-blur-35"
        style={{
          background:
            "linear-gradient(rgba(0, 0, 0, 0.86) 0%, rgba(18, 18, 18, 0.72) 100%)",
        }}
      >
        <div className="section-px section-container flex h-full items-center justify-between">
          <a href="#home" aria-label="Platinuss Design" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-platinuss.png"
              alt="Platinuss Design"
              className="h-[52px] w-auto mix-blend-screen select-none"
            />
          </a>
          <div className="flex items-center gap-6 hidden md:flex">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} className="cursor-pointer">
                {l.label}
              </a>
            ))}
          </div>
          <a href="#form" className="btn-nav hidden md:block">
            Quero meu site
          </a>
          <button
            type="button"
            aria-label="Abrir menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden relative flex items-center justify-center w-10 h-10 text-white"
          >
            <span
              className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
                open ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              }`}
            >
              <CloseIcon />
            </span>
            <span
              className={`absolute inset-0 flex items-center justify-center transition-all duration-200 ${
                open ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              }`}
            >
              <MenuIcon />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-200 ${
          open ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
        }`}
      />
      {/* Mobile drawer */}
      <aside
        aria-hidden={!open}
        className={`md:hidden fixed top-0 right-0 z-40 h-full w-4/5 max-w-drawer bg-drawer text-white pt-27.5 px-6 flex flex-col gap-6 border-l border-white/10 transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "invisible translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-5 text-lg">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/10 pb-3 cursor-pointer"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#form"
          onClick={() => setOpen(false)}
          className="btn-nav-mobile text-center"
        >
          Quero meu site
        </a>
      </aside>
    </>
  );
}
