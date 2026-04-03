import React, { useState, useEffect } from 'react';
import { ShoppingBag, Shirt, Coffee, Gift, Sparkles, X } from 'lucide-react';
import { GooeyText } from './gooey-text-morphing';

const InteractiveSelector = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animatedOptions, setAnimatedOptions] = useState([]);
    const [fullscreenImage, setFullscreenImage] = useState(null);

    const options = [
        {
            title: "бренд маркет на арбате",
            image: "/isdelia/i1.png",
            icon: <ShoppingBag size={24} className="text-white" />
        },
        {
            title: "мерч и текстиль",
            image: "/isdelia/i2.png",
            icon: <Shirt size={24} className="text-white" />
        },
        {
            title: "кофе или чай?",
            image: "/isdelia/i3.png",
            icon: <Coffee size={24} className="text-white" />
        },
        {
            title: "современная атрибутика",
            image: "/isdelia/i4.png",
            icon: <Gift size={24} className="text-white" />
        },
        {
            title: "почему нет?",
            image: "/isdelia/i5.png",
            icon: <Sparkles size={24} className="text-white" />
        }
    ];

    const handleOptionClick = (index) => {
        if (index === activeIndex) {
            setFullscreenImage(options[index].image);
        } else {
            setActiveIndex(index);
        }
    };

    useEffect(() => {
        const timers = [];

        options.forEach((_, i) => {
            const timer = setTimeout(() => {
                setAnimatedOptions(prev => [...prev, i]);
            }, 180 * i);
            timers.push(timer);
        });

        return () => {
            timers.forEach(timer => clearTimeout(timer));
        };
    }, []);

    return (
        <div className="relative flex flex-col items-center bg-transparent font-sans text-white w-full pt-2 md:pt-4">
            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes slideFadeIn {
          0% {
            opacity: 0;
            transform: translateX(-60px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInFromTop {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeInTop {
          opacity: 0;
          transform: translateY(-20px);
          animation: fadeInFromTop 0.8s ease-in-out forwards;
        }
        
        .delay-300 {
          animation-delay: 0.3s;
        }
        
        .delay-600 {
          animation-delay: 0.6s;
        }
      `}} />

            {/* Header Section */}
            <div className="w-full max-w-2xl px-6 mb-2 text-center">
                <GooeyText
                    texts={["наши", "изделия"]}
                    morphTime={1.2}
                    cooldownTime={0.4}
                    className="w-full lowercase"
                    textClassName="text-[#1d1d1f] drop-shadow-sm lowercase"
                />
            </div>

            <div className="h-6"></div>

            {/* Options Container */}
            <div className="options flex w-full max-w-[1000px] min-w-[300px] md:min-w-[600px] h-[300px] md:h-[400px] mx-0 items-stretch overflow-hidden relative px-4 md:px-0">
                {options.map((option, index) => (
                    <div
                        key={index}
                        className={`
              option relative flex flex-col justify-end overflow-hidden transition-all duration-700 ease-in-out
              ${activeIndex === index ? 'active' : ''}
            `}
                        style={{
                            backgroundImage: `url('${option.image}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backfaceVisibility: 'hidden',
                            opacity: animatedOptions.includes(index) ? 1 : 0,
                            transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
                            minWidth: '60px',
                            minHeight: '100px',
                            margin: 0,
                            borderRadius: activeIndex === index ? '24px' : '16px',
                            borderWidth: '2px',
                            borderStyle: 'solid',
                            borderColor: activeIndex === index ? '#f5f5f7' : '#e5e5ea',
                            cursor: 'pointer',
                            backgroundColor: '#f5f5f7',
                            boxShadow: activeIndex === index
                                ? '0 20px 40px rgba(0,0,0,0.15)'
                                : '0 4px 12px rgba(0,0,0,0.05)',
                            flex: activeIndex === index ? '7 1 0%' : '1 1 0%',
                            zIndex: activeIndex === index ? 10 : 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-end',
                            position: 'relative',
                            overflow: 'hidden',
                            willChange: 'flex-grow, box-shadow, background-size, background-position',
                            marginRight: index < options.length - 1 ? '10px' : '0'
                        }}
                        onClick={() => handleOptionClick(index)}
                    >
                        {/* Shadow effect */}
                        <div
                            className="shadow absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
                            style={{
                                bottom: activeIndex === index ? '0' : '-40px',
                                height: '140px',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)'
                            }}
                        ></div>

                        {/* Label with icon and info */}
                        <div className="label absolute left-0 right-0 bottom-5 flex items-center justify-start h-12 z-2 pointer-events-none px-4 gap-3 w-full">
                            <div className="icon min-w-[44px] max-w-[44px] h-[44px] flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md shadow-sm border border-white/20 flex-shrink-0 flex-grow-0 transition-all duration-200">
                                {option.icon}
                            </div>
                            <div className="info text-white whitespace-pre relative overflow-hidden">
                                <div
                                    className="main font-bold text-lg transition-all duration-700 ease-in-out lowercase"
                                    style={{
                                        opacity: activeIndex === index ? 1 : 0,
                                        transform: activeIndex === index ? 'translateX(0)' : 'translateX(25px)'
                                    }}
                                >
                                    {option.title}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Fullscreen Overlay */}
            {fullscreenImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-sm transition-opacity duration-300 cursor-pointer"
                    onClick={() => setFullscreenImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white/50 hover:text-white bg-black/50 p-3 rounded-full backdrop-blur-md transition-colors z-[110] flex items-center justify-center pointer-events-auto"
                        onClick={(e) => {
                            e.stopPropagation();
                            setFullscreenImage(null);
                        }}
                    >
                        <X size={32} />
                    </button>
                    <img
                        src={fullscreenImage}
                        className="max-w-full max-h-full object-contain rounded-[24px] shadow-2xl pointer-events-none"
                        alt="fullscreen view"
                    />
                </div>
            )}
        </div >
    );
};

export default InteractiveSelector;
