"use client";

import Image from "next/image";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Slide = {
  src: string;
  alt: string;
};

export function GallerySlider({ slides }: { slides: Slide[] }) {
  return (
    <Swiper
      modules={[A11y, Autoplay, Navigation, Pagination]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4200, disableOnInteraction: true }}
      loop
      className="work-swiper"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.src}>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md bg-zinc-100">
            <Image src={slide.src} alt={slide.alt} fill sizes="(min-width: 1024px) 980px, 100vw" className="object-cover" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
