"use client";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Thumbs, FreeMode } from "swiper/modules";
import { useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";

type GalleryImageProductProps = {
  title: string;
  mainImage?: string | null;
  attaches?: string[];
};

function GalleryImageProduct({ title, mainImage, attaches }: GalleryImageProductProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  // ساختن لیست تصاویر
  const hasMainImage = !!mainImage;
  const hasAttaches = Array.isArray(attaches) && attaches.length > 0;

  let gallery: string[] = [];
  if (hasMainImage && hasAttaches) {
    gallery = [mainImage!, ...attaches];
  } else if (!hasMainImage && hasAttaches) {
    gallery = attaches;
  } else if (hasMainImage && !hasAttaches) {
    gallery = [mainImage!];
  }

  const showSlider = gallery.length > 1;

  return (
    <div className="w-full mb-2 px-3">
      {gallery.length > 0 ? (
        showSlider ? (
          <div className="flex gap-2">
            {/* Thumbnails */}
            <Swiper
              onSwiper={setThumbsSwiper}
              direction="vertical"
              spaceBetween={10}
              slidesPerView={4}
              freeMode
              watchSlidesProgress
              modules={[FreeMode, Thumbs]}
              className="w-20 h-48 rounded-lg overflow-auto"
            >
              {gallery.map((image, index) => (
                <SwiperSlide
                  key={`thumb-${index}`}
                  className="relative !h-12 !w-12 rounded-full overflow-hidden cursor-pointer shadow-md"
                >
                  <Image
                    src={image}
                    alt={`thumb-${index}`}
                    fill
                    className="object-cover rounded-full"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Main slider */}
            <Swiper
              thumbs={{ swiper: thumbsSwiper }}
              modules={[Pagination, Autoplay, Thumbs]}
              spaceBetween={10}
              slidesPerView={1}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              pagination={{ clickable: true }}
              className="h-48 w-full rounded-xl shadow-lg"
            >
              {gallery.map((image, index) => (
                <SwiperSlide
                  key={`main-${index}`}
                  className="relative h-48 rounded-xl shadow-xl"
                >
                  <Image
                    src={image}
                    alt={`image-${index}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover rounded-xl"
                    priority={index === 0}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="w-full h-48 rounded-xl overflow-hidden relative">
            <Image
              src={gallery[0]}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
              className="object-cover w-full h-full"
            />
          </div>
        )
      ) : (
        <div className="w-full h-48 rounded-xl overflow-hidden relative">
          <Image
            src="/images/logo.png"
            alt="placeholder"
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover w-full h-full filter grayscale opacity-20"
          />
        </div>
      )}
    </div>
  );
}

export default GalleryImageProduct;
