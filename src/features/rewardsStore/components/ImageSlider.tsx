"use client";
import React, { useState } from "react";
import { IconButton } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

interface ImageSliderProps {
  images: string[]; // لیست آدرس عکس‌ها
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-60 md:h-96 flex items-center justify-center overflow-hidden rounded-lg bg-gray-100">
      {/* عکس فعلی */}
      <img
        src={images[currentIndex]}
        alt={`slide-${currentIndex}`}
        className="w-full h-full object-cover transition-transform duration-300"
      />

      {/* دکمه قبلی */}
      <IconButton
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white z-10"
        size="small"
      >
        <ArrowBackIos fontSize="small" />
      </IconButton>

      {/* دکمه بعدی */}
      <IconButton
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white z-10"
        size="small"
      >
        <ArrowForwardIos fontSize="small" />
      </IconButton>

      {/* نشانگر اسلاید */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`w-2 h-2 rounded-full ${
              idx === currentIndex ? "bg-primary" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
