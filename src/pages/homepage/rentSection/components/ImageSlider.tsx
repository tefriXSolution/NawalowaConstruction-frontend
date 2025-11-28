import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ImageSlider({ images = [] }: { images?: string[] }) {
    const [current, setCurrent] = useState(0);

    const prevSlide = () => {
        if (!images || images.length === 0) return;
        setCurrent((current - 1 + images.length) % images.length);
    };

    const nextSlide = () => {
        if (!images || images.length === 0) return;
        setCurrent((current + 1) % images.length);
    };

    return (
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-t-lg">
            {/* Image */}
            <img
                src={images.length > 0 ? images[current] : ''}
                alt={"slider-image_" + current}
                className="w-full h-full object-cover transition-all duration-500"
            />

            {/* Left Arrow */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-3 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full hover:bg-black/60"
            >
                <ChevronLeft size={20} />
            </button>

            {/* Right Arrow */}
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-3 -translate-y-1/2 p-2 bg-black/40 text-white rounded-full hover:bg-black/60"
            >
                <ChevronRight size={20} />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {Array.isArray(images) && images.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full cursor-pointer ${index === current ? "bg-white" : "bg-white/40"
                            }`}
                    ></div>
                ))}
            </div>
        </div>
    );
}
