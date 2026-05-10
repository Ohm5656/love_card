"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface Props {
  captions: string[];
  closingLine: string;
  photos: string[];
  onType: () => void;
  onNext: () => void;
}

export default function LittleThingsScene({
  captions,
  closingLine,
  photos,
  onType,
  onNext,
}: Props) {
  const rotations = [-8, 3, -4];
  const xOffsets = [-76, 0, 76];
  const yOffsets = [18, -26, 26];
  const secondLine = "และนี่คือรูปที่เราอยากให้เธอเห็นอีกครั้ง";
  const fullText = useMemo(
    () => `${closingLine}\n${secondLine}`,
    [closingLine, secondLine],
  );
  const [visibleLength, setVisibleLength] = useState(0);

  useEffect(() => {
    let interval: number | undefined;

    const startTimer = window.setTimeout(() => {
      interval = window.setInterval(() => {
        setVisibleLength((current) => {
          if (current >= fullText.length) {
            if (interval) {
              window.clearInterval(interval);
            }
            return current;
          }

          const nextCharacter = fullText[current];

          if (nextCharacter && nextCharacter.trim()) {
            onType();
          }

          return current + 1;
        });
      }, 58);
    }, 2350);

    return () => {
      window.clearTimeout(startTimer);

      if (interval) {
        window.clearInterval(interval);
      }
    };
  }, [fullText, onType]);

  const [visibleClosingLine = "", visibleSecondLine = ""] = fullText
    .slice(0, visibleLength)
    .split("\n");
  const isTypingDone = visibleLength >= fullText.length;

  return (
    <motion.div
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center px-6 py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.02,
        filter: "blur(12px)",
        transition: { duration: 1, ease: "easeInOut" },
      }}
      transition={{ duration: 1.05, ease: "easeOut" }}
    >
      <div className="pointer-events-none absolute left-1/2 top-[44%] h-[48vh] w-[84vw] max-w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b9827a]/12 blur-[95px]" />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center">
        <div className="relative mb-3 flex h-[18.5rem] w-full items-center justify-center sm:mb-5 sm:h-[20rem] md:mb-6 md:h-[21.5rem]">
          {photos.map((photo, index) => (
            <motion.div
              key={photo}
              initial={{
                opacity: 0,
                y: 70,
                x: xOffsets[index],
                rotate: rotations[index] - 7,
                scale: 0.92,
                filter: "blur(12px)",
              }}
              animate={{
                opacity: 1,
                y: yOffsets[index],
                x: xOffsets[index],
                rotate: rotations[index],
                scale: 1,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 1.45,
                ease: [0.25, 1, 0.5, 1],
                delay: 0.35 + index * 0.58,
              }}
              className="absolute h-40 w-[7.75rem] border border-[#fff7ea]/18 bg-[#f3e7d0] p-2 pb-9 shadow-[0_30px_72px_-22px_rgba(0,0,0,0.88)] sm:h-[12.5rem] sm:w-40 sm:pb-10"
              style={{ zIndex: index + 1 }}
            >
              <div className="relative h-full w-full overflow-hidden bg-[#1c1410] shadow-inner">
                <Image
                  src={photo}
                  alt={`รูปที่ชอบที่สุด ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 124px, 160px"
                  className="object-cover opacity-90 sepia-[0.08] transition-all duration-700 hover:opacity-100 hover:sepia-0"
                />
              </div>
              <div className="absolute bottom-2.5 left-2 right-2 truncate text-center font-serif text-[10px] font-light text-[#6e5336]/86 sm:text-xs">
                {captions[index]}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex min-h-[8.75rem] flex-col items-center justify-center gap-3 text-center font-serif sm:min-h-[10rem] sm:gap-4">
          <motion.p
            initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
            animate={{
              opacity: visibleLength > 0 ? 1 : 0,
              y: visibleLength > 0 ? 0 : 12,
              filter: visibleLength > 0 ? "blur(0px)" : "blur(8px)",
            }}
            transition={{ duration: 0.75 }}
            className="max-w-[22rem] text-[1.2rem] font-light leading-relaxed tracking-normal text-[#fff7ea] sm:text-2xl"
          >
            {visibleClosingLine}
            {!isTypingDone && visibleLength > 0 && !visibleSecondLine && (
              <span className="ml-1 inline-block h-[0.85em] w-px translate-y-1 bg-[#c9a76a]/85" />
            )}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
            animate={{
              opacity: visibleSecondLine ? 1 : 0,
              y: visibleSecondLine ? 0 : 12,
              filter: visibleSecondLine ? "blur(0px)" : "blur(8px)",
            }}
            transition={{ duration: 0.75 }}
            className="max-w-[20rem] text-base font-light leading-relaxed text-[#cdbfae] sm:text-lg"
          >
            {visibleSecondLine}
            {!isTypingDone && visibleSecondLine && (
              <span className="ml-1 inline-block h-[0.85em] w-px translate-y-1 bg-[#c9a76a]/75" />
            )}
          </motion.p>
        </div>

        <motion.button
          initial={{ opacity: 0, y: 8, filter: "blur(5px)" }}
          animate={{
            opacity: isTypingDone ? 1 : 0,
            y: isTypingDone ? 0 : 8,
            filter: isTypingDone ? "blur(0px)" : "blur(5px)",
          }}
          transition={{ duration: 0.9 }}
          onClick={onNext}
          className="mt-5 rounded-full border border-[#c9a76a]/34 bg-[#f3e7d0]/8 px-7 py-3 text-sm font-light tracking-normal text-[#fff7ea]/76 shadow-[0_0_34px_rgba(201,167,106,0.08)] transition-all duration-500 hover:border-[#f3e7d0]/52 hover:bg-[#f3e7d0]/12 hover:text-[#fff7ea] focus:outline-none focus:ring-2 focus:ring-[#c9a76a]/35 sm:mt-6"
        >
          เปิดอัลบั้มของเรา
        </motion.button>
      </div>
    </motion.div>
  );
}
