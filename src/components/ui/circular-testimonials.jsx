"use client";
import React, {
    useEffect,
    useRef,
    useState,
    useMemo,
    useCallback,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function calculateGap(width) {
    const minWidth = 1024;
    const maxWidth = 1456;
    const minGap = 60;
    const maxGap = 86;
    if (width <= minWidth) return minGap;
    if (width >= maxWidth)
        return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
    return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularTestimonials = ({
    testimonials,
    autoplay = true,
    colors = {},
    fontSizes = {},
    onCharacterClick,
}) => {
    // Color & font config
    const colorName = colors.name ?? "#000";
    const colorDesignation = colors.designation ?? "#6b7280";
    const colorTestimony = colors.testimony ?? "#4b5563";
    const colorArrowBg = colors.arrowBackground ?? "#141414";
    const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
    const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";
    const fontSizeName = fontSizes.name ?? "1.5rem";
    const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
    const fontSizeQuote = fontSizes.quote ?? "1.125rem";

    // State
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoverPrev, setHoverPrev] = useState(false);
    const [hoverNext, setHoverNext] = useState(false);
    const [containerWidth, setContainerWidth] = useState(1200);

    const imageContainerRef = useRef(null);
    const autoplayIntervalRef = useRef(null);

    const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
    const activeTestimonial = useMemo(
        () => testimonials[activeIndex],
        [activeIndex, testimonials]
    );

    // Responsive gap calculation
    useEffect(() => {
        function handleResize() {
            if (imageContainerRef.current) {
                setContainerWidth(imageContainerRef.current.offsetWidth);
            }
        }
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Autoplay
    useEffect(() => {
        if (autoplay) {
            autoplayIntervalRef.current = setInterval(() => {
                setActiveIndex((prev) => (prev + 1) % testimonialsLength);
            }, 5000);
        }
        return () => {
            if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
        };
    }, [autoplay, testimonialsLength]);

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "ArrowRight") handleNext();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
        // eslint-disable-next-line
    }, [activeIndex, testimonialsLength]);

    // Navigation handlers
    const handleNext = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
        if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    }, [testimonialsLength]);
    const handlePrev = useCallback(() => {
        setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
        if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    }, [testimonialsLength]);

    // Compute transforms for each image (always show 3: left, center, right)
    function getImageStyle(index) {
        const gap = calculateGap(containerWidth);
        const maxStickUp = gap * 0.8;
        const offset = (index - activeIndex + testimonialsLength) % testimonialsLength;
        // const zIndex = testimonialsLength - Math.abs(offset);
        const isActive = index === activeIndex;
        const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
        const isRight = (activeIndex + 1) % testimonialsLength === index;
        if (isActive) {
            return {
                zIndex: 3,
                opacity: 1,
                pointerEvents: "auto",
                transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        if (isLeft) {
            return {
                zIndex: 2,
                opacity: 1,
                pointerEvents: "none",
                transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        if (isRight) {
            return {
                zIndex: 2,
                opacity: 1,
                pointerEvents: "none",
                transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
                transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
            };
        }
        // Hide all other images
        return {
            zIndex: 1,
            opacity: 0,
            pointerEvents: "none",
            transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
        };
    }

    // Framer Motion variants for quote
    const quoteVariants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 },
    };

    return (
        <div className="w-full max-w-5xl px-8 py-0 md:py-4 z-10 relative mt-4 md:mt-8 font-sans">
            <div className="grid gap-12 md:grid-cols-2 md:gap-20">
                {/* Images */}
                <div className="relative w-full h-80 perspective-[1000px] cursor-pointer" ref={imageContainerRef} onClick={() => onCharacterClick && onCharacterClick(activeTestimonial)}>
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.src}
                            className="absolute w-full h-full group bg-[#1d1d1f] rounded-[24px]"
                            style={{
                                ...getImageStyle(index),
                                willChange: "transform, opacity, z-index"
                            }}
                            data-index={index}
                        >
                            <img
                                src={testimonial.src}
                                alt={testimonial.name}
                                className={`absolute inset-0 w-full h-full object-cover rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/50`}
                            />
                            {testimonial.hoverSrc && (
                                <img
                                    src={testimonial.hoverSrc}
                                    alt={`${testimonial.name} hover`}
                                    className="absolute inset-0 w-full h-full object-cover rounded-[24px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                />
                            )}
                        </div>
                    ))}
                    <div className="absolute inset-x-0 bottom-6 flex justify-center z-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-black/50 backdrop-blur-md text-white text-xs px-4 py-1.5 rounded-full lowercase shadow-lg border border-white/20">
                            перейти к профилю
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between py-4" style={{ isolation: 'isolate' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            variants={quoteVariants}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <h3
                                className="font-bold mb-1 lowercase cursor-pointer hover:text-[#0071e3] transition-colors"
                                style={{ color: colorName, fontSize: fontSizeName }}
                                onClick={() => onCharacterClick && onCharacterClick(activeTestimonial)}
                            >
                                {activeTestimonial.name}
                            </h3>
                            <p
                                className="lowercase mb-8 font-medium"
                                style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
                            >
                                {activeTestimonial.designation}
                            </p>
                            <motion.p
                                className="lowercase leading-relaxed"
                                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
                            >
                                {activeTestimonial.quote.split(" ").map((word, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{
                                            filter: "blur(10px)",
                                            opacity: 0,
                                            y: 5,
                                        }}
                                        animate={{
                                            filter: "blur(0px)",
                                            opacity: 1,
                                            y: 0,
                                        }}
                                        transition={{
                                            duration: 0.22,
                                            ease: "easeInOut",
                                            delay: 0.025 * i,
                                        }}
                                        style={{ display: "inline-block" }}
                                    >
                                        {word}&nbsp;
                                    </motion.span>
                                ))}
                            </motion.p>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

        </div>
    );
};

export default CircularTestimonials;
