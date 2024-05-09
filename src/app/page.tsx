"use client";

import { images } from "@/data";
import Image from "next/image";
import {  Modal,   ModalContent,   ModalHeader,   ModalBody,   ModalFooter, useDisclosure} from "@nextui-org/modal";
import Slider from "react-slick";

export default function Home() {
  const sectionClassName = "flex min-h-screen flex-col items-center justify-center text-center";
  const buttonClassName = "chapters-btn fixed bottom-10 left-1/2 -translate-x-1/2 z-10 px-[1.25rem] py-[.6875rem] rounded-full font-extrabold uppercase text-sm";
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    variableWidth: true,
    centerMode: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false // need custom
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
          base: "z-8",
          wrapper: "z-8",
          closeButton: "hidden",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <div
              className={`${sectionClassName} bg-black px-8 overflow-hidden w-full`}
            >
              <div className="container relative">
                <Slider {...settings} className="hover:cursor-pointer">
                  {images.map((img, ind) => (
                    <div key={img.image} className="sticky group">
                      <Image
                        src={img.image}
                        alt={"slide-" + (ind + 1)}
                        width={280}
                        height={200}
                        className="px-2 hover:cursor-pointer hover:contrast-50 transition-all"
                        // placeholder="blur"
                        // quality={100}
                        style={{
                          width: 280,
                          // height: "200px !important"
                        }}
                      />

                      <div
                        className="absolute bottom-2 left-4 bg-white text-xs py-1 px-1.5 rounded-sm transition-all invisible group-hover:visible"
                        dangerouslySetInnerHTML={{ __html: img.attr }}
                      />
                    </div>
                  ))}
                </Slider>
              </div>

              <button onClick={onClose} className={buttonClassName}>
                close
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
