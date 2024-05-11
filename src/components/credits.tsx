import React from "react";
import Footer from "./footer";

const Credits = () => {
  return (
    <section id="credits" className="credits section p-12 bg-black relative">
      <div className="mt-4 ml-auto mr-0 md:mr-[64px] xl:mr-[84px] credit-group items-end">
        <a
          href="https://unsplash.com/"
          target="__blank"
          className="credit reverse"
        >
          Unsplash
        </a>
        <p className="credit-title">Image source</p>
      </div>

      <div className="blobs">
        <div className="blob" />
        <div className="blob" />
      </div>

      <div className="mb-5 mr-auto ml-0 md:ml-[64px] xl:ml-[84px] credit-group items-start">
        <a
          href="https://booksofdesign.designstripe.com/artists/alphonse-mucha"
          target="__blank"
          className="credit"
        >
          Alphonse Mucha
        </a>
        <a
          href="https://www.pixelflakes.com/"
          target="__blank"
          className=" credit"
        >
          Pixelflaxes
        </a>
        <a
          href="https://twitter.com/jh3yy/status/1754547227576467729"
          target="__blank"
          className=" credit"
        >
          Jhey
        </a>
        <p className="credit-title">Inspirations</p>
      </div>

      <Footer />
    </section>
  );
};

export default Credits;
