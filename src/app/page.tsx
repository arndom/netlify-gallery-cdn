"use client";

import { images } from "@/data";
import { ImageLoaderProps } from "next/image";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import GalleryImage from "@/components/gallery-image";

export default function Home() {
  const sectionClassName =
    "flex min-h-screen flex-col items-center justify-center text-center";
  const buttonClassName =
    "chapters-btn fixed bottom-10 left-1/2 -translate-x-1/2 z-10 px-[1.25rem] py-[.6875rem] rounded-full font-extrabold uppercase text-sm";

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const loadImage = (args: ImageLoaderProps) => {
    const { src } = args;

    return `.netlify/images?url=${src}&w=${280}&h=${280}&q=${75}&fit=${"cover"}&fm=${"png"}`;
  };

  return (
    <main className="min-h-screen">
      <div className="navbar fixed top-0 w-full p-8 z-10 flex justify-between font-bold uppercase text-sm">
        <a href="#">Net Gala</a>
        <a href="#credits">Credits</a>
      </div>

      <section className={`${sectionClassName} bg-white`}>
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

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="bottom-center"
        size="full"
        scrollBehavior="outside"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "linear",
              },
            },
            exit: {
              y: 200,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "linear",
              },
            },
          },
        }}
        classNames={{
          backdrop: "z-8",
          base: "z-8  mt-0",
          wrapper: "z-8 overflow-hidden",
          closeButton: "hidden",
        }}
      >
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
                      }}
                    />
                  );
                })}
              </div>

              <button onClick={onClose} className={buttonClassName}>
                close
                {/* <span>X</span> */}
              </button>
            </div>
          )}
        </ModalContent>
      </Modal>

      <section
        id="credits"
        className={`${sectionClassName} bg-black`}
      ></section>

      {!isOpen && (
        <button onClick={onOpen} className={buttonClassName}>
          content
        </button>
      )}
    </main>
  );
}
