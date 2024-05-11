import React from "react";

const Footer = () => {
  return (
    <div className="footer absolute bottom-0 w-full p-8 z-10 flex justify-between font-bold uppercase text-sm">
      <a
        href="https://docs.netlify.com/image-cdn/overview/"
        target="https://docs.netlify.com/image-cdn/overview/"
      >
        Checkout Netlify
      </a>
      <a href="https://github.com/arndom/netlify-gallery-cdn" target="__blank">
        Get the Code
      </a>
    </div>
  );
};

export default Footer;
