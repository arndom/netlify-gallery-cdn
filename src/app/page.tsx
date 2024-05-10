"use client";

import { useState } from "react";
import { TransformsT, defaultTransforms, images } from "@/data";
import { ImageLoaderProps } from "next/image";
import { ModalContent, useDisclosure } from "@nextui-org/modal";
import GalleryImage from "@/components/gallery-image";
import ImageTransforms from "@/components/image-transforms";
import Nav from "@/components/nav";
import Banner from "@/components/banner";
import ModalWrapper from "@/components/modal-wrapper";

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [transforms, setTransforms] = useState<TransformsT>(defaultTransforms);

  const resetTransforms = () => setTransforms(defaultTransforms);

  const loadImage = (args: ImageLoaderProps) => {
    const { src } = args;

    return `.netlify/images?url=${src}&w=${transforms.width}&h=${transforms.height}&q=${transforms.quality}&fit=${transforms.fit}&fm=${transforms.format}`;
  };

  console.log(transforms);

  return (
    <main className="min-h-screen">
      <Nav />
      <Banner />

      <ModalWrapper isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <div className="h-screen bg-black w-full py-24 overflow-y-auto modal">
              <div className="mx-12 flex flex-wrap gap-4 items-center justify-center">
                {images.map((img, ind) => {
                  return (
                    <GalleryImage
                      key={img.image}
                      {...{
                        loadImage,
                        src: img.image,
                        alt: "slide-" + (ind + 1),
                        transforms,
                      }}
                    />
                  );
                })}
              </div>

              <ImageTransforms
                {...{ transforms, setTransforms, resetTransforms }}
              />

              <button
                onClick={onClose}
                className="chapters-btn fixed bottom-[90px] left-1/2 -translate-x-1/2 z-10 w-[44px] h-[44px] rounded-full font-semibold text-sm"
              >
                Exit
              </button>
            </div>
          )}
        </ModalContent>
      </ModalWrapper>

      <section id="credits" className="section bg-black"></section>

      {!isOpen && (
        <button onClick={onOpen} className="styled-btn">
          content
        </button>
      )}
    </main>
  );
}
