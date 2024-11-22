"use client";
import { useState } from "react";
import { Skeleton } from "./ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { motion } from "framer-motion";

const Features = () => {
  const [selectedFeature, setSelectedFeature] = useState(0);

  const features = [
    "Quantum Core Processor",
    "Holographic Display",
    "Telepathic Interface",
    "Time Dilation Mode",
  ];

  return (
    <section className="bg-secondary py-16 z-10 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <Tabs
              value={String(selectedFeature)}
              onValueChange={(v) => setSelectedFeature(Number(v))}
            >
              <TabsList className="grid grid-cols-2 gap-4 bg-transparent h-fit">
                {features.map((feature, index) => (
                  <TabsTrigger
                    key={index}
                    value={String(index)}
                    className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                  >
                    {feature}
                  </TabsTrigger>
                ))}
              </TabsList>
              {features.map((feature, index) => (
                <TabsContent key={index} value={String(index)}>
                  <p className="text-primary/60 mt-4">
                    Experience the power of {feature.toLowerCase()}. This
                    cutting-edge technology pushes the boundaries of what&apos;s
                    possible in a wearable device.
                  </p>
                </TabsContent>
              ))}
            </Tabs>
          </div>
          <div className="relative h-80">
            <motion.div
              animate={{
                opacity: [0, 1, 0],
                scale: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-green-500 rounded-full opacity-20 blur-3xl"
            />
            <Skeleton className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 size-80 bg-white grid place-items-center text-black text-xl capitalize">
              {features[selectedFeature]}
            </Skeleton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
