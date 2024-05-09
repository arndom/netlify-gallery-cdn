"use client";

import { images } from "@/data";
import Image, { ImageLoaderProps } from "next/image";
import {
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/modal";

export default function Home() {
  const sectionClassName =
    "flex min-h-screen flex-col items-center justify-center text-center";
  const buttonClassName =
    "chapters-btn fixed bottom-10 left-1/2 -translate-x-1/2 z-10 px-[1.25rem] py-[.6875rem] rounded-full font-extrabold uppercase text-sm";

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const loadImage = (args: ImageLoaderProps) => {
    const { src } = args;

    // prod
    return `.netlify/images?url=${src}&w=${280}&h=${280}&q=${75}&fit=${"cover"}&fm=${"png"}`;
  }

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
                  const check = process.env.NEXT_PUBLIC_ENV === "dev";

                  const loadImageProp = {
                    loader: loadImage,
                  }

                  const defaultDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACJAIkDASIAAhEBAxEB/8QAGgABAQEBAQEBAAAAAAAAAAAAAwIBAAQGBf/EABgQAQEBAQEAAAAAAAAAAAAAAAABAhED/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APpqjSqjQD2DZtg2Adh0XYdAlUS2ATJMjySAuOdHAnQdl0LYPP6PN6PT6PNsAaY3TAfZWo1W2o1QRug2XVDugHYtE3RaBKohUAmSQWSQCRzJXdBOhbJqi2ANvPt6NvNsA6SrSQfXdTqu6i0E6od0mqHdAWqLVJqitBnVSo62UC5pJQ5pJQJK7qZXdB2qLdXaLVAOwbNsGwDpjdJB9V1FruotBmqHVXqi1QRqitVqjtB3VSo62UCyrlFKuUCSu6nrug60Wqu0eqAtg2bYNgOpbWA+k6m1nU2gzVFqq1R6oD1UWq1R2g7rZU9bKBJVyjlXKC+t6nrugy0equ0egHsOi6DoB1jawH7/AFNruptBOqPVXqi1QRqjq9DoOVENgEi5RxcBfXdY4HUel0egHoOi6FoB1jawH7qa1NBOhaJoWgRodXodByohUBcXERcBTnRwMqNKqNAPQtF0LQDrG1gP22VqaCND0TQtAPSKvSKDGxjYC4uIi4Co1kcDKjS6jQC0PRND0A6xtcD9pNUmgjQtF0LQD0Ok0OgxUSqAuLiIuAqOdHAyo0uo0AtD0TQ9AOudXA//2Q==";
                  const blurDataURLProp = {
                    blurDataURL: check ? defaultDataURL : `.netlify/images?url=${img.image}&w=${280}&h=${280}&fm=blurhash`
                  }

                  return (
                    <div key={img.image}>
                      <Image
                        {...(!check && loadImageProp)}
                        src={img.image}
                        alt={"slide-" + (ind + 1)}
                        width={280}
                        height={280}
                        placeholder="blur"
                        {...blurDataURLProp}
                        quality={100}
                        style={{
                          width: 280,
                          height: 280,
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  );
                })}
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
