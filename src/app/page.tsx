"use client";

import { images } from "@/data";
import Image from "next/image";

export default function Home() {
  const sectionClassName = "flex min-h-screen flex-col items-center justify-center text-center";

  return (
    <main className="min-h-screen">
      <div className="navbar fixed top-0 w-full p-8 z-10 flex justify-between font-bold uppercase text-sm">
        <a href="#">Gallery Demo</a>
        <a href="#credits">Credits</a>
      </div>

      <section className={`${sectionClassName} bg-white`}>
        <div className="banner">
          <p className="font-thin text-xs md:text-sm lg:text-md -mb-4 md:-mb-8 lg:-mb-12 font-serif italic text-right w-full">
            Netlify
          </p>

          <p className="main-text text-9xl text-center font-medium">
            Gallery Demo
          </p>

          <p className="text-md mt-3 md:mt-4 lg:mt-6">
            curated by{" "}
            <a
              href="https://github.com/arndom"
              target="__blank"
              className="underline underline-offset-4"
            >
              @arndom
            </a>
          </p>
        </div>
      </section>

      <section id="slides" className={`${sectionClassName} bg-black py-8 overflow-hidden`}>
        <div className="slides flex gap-4 px-4 py-24 items-center overflow-x-auto">
          {images.map((img, ind) => (
            <Image
              src={img.image}
              key={img.image}
              alt={"slide-" + (ind + 1)}
              width={280}
              height={280}
              objectFit="cover"
              quality={100}
            />
          ))}
        </div>
      </section>

      <section
        id="credits"
        className={`${sectionClassName} bg-white`}
      ></section>

      <a href="#slides" className="chapters-btn fixed bottom-10 left-1/2 -translate-x-1/2 z-10 px-[1.25rem] py-[.6875rem] rounded-full font-extrabold uppercase text-sm">
        Content
      </a>
    </main>
  );
}
