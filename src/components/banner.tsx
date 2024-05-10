import React from "react";

const Banner = () => {
  return (
    <section className="section bg-white">
      <div className="banner">
        <p className="main-text text-9xl text-center font-medium relative">
          <span className="absolute top-1/3 -translate-y-full -mt-1 sm:mt-0: right-0 font-thin text-xs sm:text-sm md:text-md lg:text-md font-serif italic text-right w-full">
            Netlify
          </span>
          Gallery
        </p>

        <p className="text-xs sm:text-sm md:text-md mt-0">
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
  );
};

export default Banner;
