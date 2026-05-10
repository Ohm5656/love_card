"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

interface Props {
  caption: string;
  question: string;
  line: string;
  photo: string;
  onType: () => void;
  onNext: () => void;
}

export default function FirstMemoryScene({
  caption,
  question,
  line,
  photo,
  onType,
  onNext,
}: Props) {
  const fullText = useMemo(() => `${question}\n${line}`, [question, line]);
  const [visibleLength, setVisibleLength] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setVisibleLength((current) => {
        if (current >= fullText.length) {
          window.clearInterval(interval);
          return current;
        }

        const nextCharacter = fullText[current];

        if (nextCharacter && nextCharacter.trim()) {
          onType();
        }

        return current + 1;
      });
    }, 74);

    return () => window.clearInterval(interval);
  }, [fullText, onType]);

  const [visibleQuestion = "", visibleLine = ""] = fullText
    .slice(0, visibleLength)
    .split("\n");

  const isTypingDone = visibleLength >= fullText.length;
  const nextButtonLabel = "ดูรูปที่เราชอบที่สุด";

  return (
    <motion.div
      className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden px-5 py-5 sm:px-8 sm:py-8"
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
      <div className="absolute inset-0">
        <Image
          src={photo}
          alt=""
          fill
          sizes="100vw"
          className="scale-110 object-cover opacity-[0.18] blur-md sepia-[0.2]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_42%,rgba(201,167,106,0.2),transparent_34%),linear-gradient(90deg,rgba(9,7,6,0.94)_0%,rgba(18,13,10,0.78)_48%,rgba(9,7,6,0.94)_100%)]" />
      </div>

      <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[94vw] max-w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a76a]/12 blur-[100px]" />

      <div className="relative z-10 grid w-full max-w-6xl items-center gap-5 sm:gap-7 md:grid-cols-[minmax(0,1fr)_minmax(320px,390px)] md:gap-14">
        <div className="flex flex-col items-center text-center font-serif md:items-start md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="mb-3 text-[11px] font-light tracking-[0.28em] text-[#c9a76a]/80 sm:mb-5 sm:text-xs"
          >
            FIRST MEMORY
          </motion.p>

          <div className="min-h-[6.1rem] sm:min-h-[8.5rem] md:min-h-[10rem]">
            <h1 className="text-[2.2rem] font-medium leading-tight tracking-normal text-[#fff7ea] drop-shadow-[0_12px_34px_rgba(0,0,0,0.5)] sm:text-5xl md:text-6xl">
              {visibleQuestion}
              {!isTypingDone && (
                <span className="ml-1 inline-block h-[0.9em] w-px translate-y-1 bg-[#c9a76a]/80" />
              )}
            </h1>
            <p className="mt-3 text-[1.08rem] font-light leading-relaxed text-[#cdbfae] sm:mt-4 sm:text-2xl md:text-3xl">
              {visibleLine}
            </p>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 8, filter: "blur(5px)" }}
            animate={{
              opacity: isTypingDone ? 1 : 0,
              y: isTypingDone ? 0 : 8,
              filter: isTypingDone ? "blur(0px)" : "blur(5px)",
            }}
            transition={{ duration: 0.9, delay: 1.05 }}
            onClick={onNext}
            className="mt-6 hidden rounded-full border border-[#c9a76a]/34 bg-[#f3e7d0]/8 px-7 py-3 text-sm font-light tracking-normal text-[#fff7ea]/76 shadow-[0_0_34px_rgba(201,167,106,0.08)] transition-all duration-500 hover:border-[#f3e7d0]/52 hover:bg-[#f3e7d0]/12 hover:text-[#fff7ea] focus:outline-none focus:ring-2 focus:ring-[#c9a76a]/35 md:mt-8 md:inline-flex"
          >
            {nextButtonLabel}
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97, filter: "blur(18px)" }}
          animate={{
            opacity: isTypingDone ? 1 : 0,
            y: isTypingDone ? 0 : 28,
            scale: isTypingDone ? 1 : 0.97,
            filter: isTypingDone ? "blur(0px)" : "blur(18px)",
          }}
          transition={{ duration: 1.45, ease: "easeOut" }}
          className="relative mx-auto aspect-[4/5] w-full max-w-[232px] rotate-[-1deg] border border-[#fff7ea]/18 bg-[#f3e7d0] p-2 pb-8 shadow-[0_34px_84px_-24px_rgba(0,0,0,0.95)] sm:max-w-[305px] sm:p-2.5 sm:pb-9 md:max-w-[390px]"
        >
          <div className="absolute -left-3 top-5 h-full w-full rotate-[-4deg] border border-[#fff7ea]/10 bg-[#f3e7d0]/18 shadow-[0_26px_70px_-34px_rgba(243,231,208,0.55)] md:-left-4 md:top-6" />
          <div className="absolute -right-3 top-3 h-full w-full rotate-[3deg] border border-[#fff7ea]/8 bg-[#c9a76a]/12 shadow-[0_24px_80px_-42px_rgba(201,167,106,0.65)] md:-right-4" />

          <div className="relative z-10 h-full w-full overflow-hidden bg-[#1c1410] shadow-inner">
            <Image
              src={photo}
              alt="รูปแรกที่เราได้เจอกัน"
              fill
              sizes="(max-width: 768px) 232px, 330px"
              className="object-cover opacity-90 sepia-[0.08] transition-all duration-700 hover:opacity-100 hover:sepia-0"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_56%,rgba(18,13,10,0.28)_100%)]" />
          </div>
          <div className="absolute bottom-3 left-4 right-4 truncate text-center font-serif text-xs font-light text-[#6e5336]/86">
            {caption}
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 8, filter: "blur(5px)" }}
          animate={{
            opacity: isTypingDone ? 1 : 0,
            y: isTypingDone ? 0 : 8,
            filter: isTypingDone ? "blur(0px)" : "blur(5px)",
          }}
          transition={{ duration: 0.85, delay: 1.2 }}
          onClick={onNext}
          className="mx-auto rounded-full border border-[#c9a76a]/34 bg-[#f3e7d0]/8 px-7 py-3 text-sm font-light tracking-normal text-[#fff7ea]/76 shadow-[0_0_34px_rgba(201,167,106,0.08)] transition-all duration-500 hover:border-[#f3e7d0]/52 hover:bg-[#f3e7d0]/12 hover:text-[#fff7ea] focus:outline-none focus:ring-2 focus:ring-[#c9a76a]/35 md:hidden"
        >
          {nextButtonLabel}
        </motion.button>
      </div>
    </motion.div>
  );
}
