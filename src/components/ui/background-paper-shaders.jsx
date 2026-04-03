"use client"

import { MeshGradient, DotOrbit } from "@paper-design/shaders-react"

export default function BackgroundPaperShaders({ className = "" }) {
    return (
        <div className={`absolute inset-0 w-full h-full pointer-events-none -z-10 bg-[#f5f5f7] ${className}`}>
            <MeshGradient
                className="w-full h-full absolute inset-0 opacity-80"
                colors={["#ffffff", "#f0f0f5", "#e8e8ed", "#ffffff"]}
                speed={0.5}
                backgroundColor="#f5f5f7"
            />
            <div className="w-full h-full absolute inset-0 opacity-40">
                <DotOrbit
                    className="w-full h-full"
                    dotColor="#cccccc"
                    orbitColor="#e0e0e0"
                    speed={1.5}
                    intensity={0.8}
                />
            </div>
        </div>
    )
}
