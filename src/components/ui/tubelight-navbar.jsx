"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"

function cn(...classes) {
    return classes.filter(Boolean).join(" ");
}

export function NavBar({ items, className, activeTab, setActiveTab }) {
    const [isMobile, setIsMobile] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768)
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Short delay so entrance appears after splash transition
    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 100)
        return () => clearTimeout(t)
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: -24 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
                "fixed top-0 left-0 right-0 z-50 grid grid-cols-3 items-center px-4 sm:px-8 pt-3 pb-2",
                className,
            )}
        >
            {/* ── OEA Logo left ── */}
            <motion.div
                initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
                animate={mounted
                    ? { opacity: 1, scale: 1, rotate: 0 }
                    : { opacity: 0, scale: 0.6, rotate: -12 }
                }
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
                <motion.div
                    animate={{
                        y: [0, -6, 0, -4, 0],
                        filter: [
                            "drop-shadow(0 0 6px rgba(0,113,227,0.6))",
                            "drop-shadow(0 0 10px rgba(0,210,255,0.7))",
                            "drop-shadow(0 0 8px rgba(94,92,230,0.65))",
                            "drop-shadow(0 0 12px rgba(0,113,227,0.8))",
                            "drop-shadow(0 0 6px rgba(0,113,227,0.6))",
                        ],
                    }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <img
                        src="/oealogo.png"
                        alt="ОЭА логотип"
                        className="h-14 md:h-16 w-auto object-contain cursor-pointer"
                    />
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={mounted ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex justify-center"
            >
                <div className="flex items-center gap-3 bg-white/50 border border-gray-200/50 backdrop-blur-2xl py-1 px-1 rounded-full shadow-lg">
                    {items.map((item) => {
                        const Icon = item.icon
                        const isActive = activeTab === item.name

                        return (
                            <button
                                key={item.name}
                                onClick={() => setActiveTab(item.name)}
                                className={cn(
                                    "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                                    "text-[#1d1d1f]/80 hover:text-[#0071e3] lowercase",
                                    isActive && "text-[#0071e3]",
                                )}
                            >
                                <span className="hidden md:inline whitespace-nowrap">{item.name}</span>
                                <span className="md:hidden">
                                    <Icon size={18} strokeWidth={2.5} />
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="lamp"
                                        className="absolute inset-0 w-full bg-[#0071e3]/5 rounded-full -z-10"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    >
                                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#0071e3] rounded-t-full">
                                            <div className="absolute w-12 h-6 bg-[#0071e3]/20 rounded-full blur-md -top-2 -left-2" />
                                            <div className="absolute w-8 h-6 bg-[#0071e3]/20 rounded-full blur-md -top-1" />
                                            <div className="absolute w-4 h-4 bg-[#0071e3]/20 rounded-full blur-sm top-0 left-2" />
                                        </div>
                                    </motion.div>
                                )}
                            </button>
                        )
                    })}
                </div>
            </motion.div>

            {/* Spacer — balances the logo on the left */}
            <div />
        </motion.div>
    )
}
