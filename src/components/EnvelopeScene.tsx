"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  coverLabel: string;
  recipientName: string;
  senderName: string;
  onOpenSoundUnlock: () => void;
  onNext: () => void;
}

export default function EnvelopeScene({
  coverLabel,
  recipientName,
  senderName,
  onOpenSoundUnlock,
  onNext,
}: Props) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    onOpenSoundUnlock();
    setIsOpening(true);
    setTimeout(onNext, 2200);
  };

  return (
    <motion.div
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{
        opacity: 0,
        scale: 1.02,
        filter: "blur(12px)",
        transition: { duration: 1.1, ease: "easeInOut" },
      }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <motion.div
        className="pointer-events-none absolute h-[86vw] max-h-[620px] w-[86vw] max-w-[620px] rounded-full blur-[100px]"
        initial={{ opacity: 0.28, scale: 0.88 }}
        animate={{
          opacity: isOpening ? 1 : 0.34,
          scale: isOpening ? 1.25 : 1,
          background: isOpening
            ? "radial-gradient(circle, rgba(255,247,234,0.42) 0%, rgba(201,167,106,0.2) 34%, rgba(9,7,6,0) 72%)"
            : "radial-gradient(circle, rgba(201,167,106,0.14) 0%, rgba(9,7,6,0) 70%)",
        }}
        transition={{ duration: 1.7, ease: "easeInOut" }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25, duration: 1.25, ease: "easeOut" }}
      >
        <div className="relative mb-14 h-52 w-[19rem] [perspective:1100px] sm:h-56 sm:w-[21.5rem]">
          <motion.div
            className="absolute left-1/2 top-9 h-[9.5rem] w-60 -translate-x-1/2 rounded-sm bg-[#f3e7d0] px-6 py-7 text-center shadow-[0_18px_54px_rgba(201,167,106,0.2)]"
            initial={{ y: 42, opacity: 0 }}
            animate={{
              y: isOpening ? -18 : 42,
              opacity: isOpening ? 1 : 0,
            }}
            transition={{ duration: 1.35, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="absolute inset-4 border border-[#c9a76a]/25" />
            <div className="relative flex h-full flex-col items-center justify-center gap-2 font-serif text-[#5d4730]">
              <span className="text-xs font-light text-[#8f6a3d]/80">ถึง</span>
              <span className="text-2xl font-medium leading-none">{recipientName}</span>
              <span className="mt-1 h-px w-14 bg-[#c9a76a]/35" />
            </div>
          </motion.div>

          <div className="absolute inset-x-0 bottom-0 h-[9.5rem] overflow-hidden rounded-sm border border-[#c9a76a]/38 bg-[#d9c29a] shadow-[0_34px_86px_-26px_rgba(0,0,0,0.92)]">
            <div className="absolute inset-0 bg-paper opacity-82" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_49.5%,rgba(120,78,42,0.24)_50%,transparent_50.5%),linear-gradient(225deg,transparent_49.5%,rgba(120,78,42,0.18)_50%,transparent_50.5%)]" />
            <motion.div
              className="absolute inset-x-8 bottom-7 h-12 rounded-full bg-[#fff7ea]"
              initial={{ opacity: 0, scaleX: 0.25 }}
              animate={{ opacity: isOpening ? 0.7 : 0, scaleX: isOpening ? 1 : 0.25 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ filter: "blur(26px)" }}
            />
          </div>

          <motion.div
            className="absolute inset-x-0 top-0 h-[8.5rem] origin-bottom rounded-sm bg-[#f3e7d0] shadow-[0_16px_46px_rgba(0,0,0,0.32)] [clip-path:polygon(0_0,100%_0,50%_100%)]"
            initial={{ rotateX: 0 }}
            animate={{ rotateX: isOpening ? -170 : 0, y: isOpening ? -6 : 0 }}
            transition={{ duration: 1.45, ease: [0.25, 1, 0.5, 1] }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="absolute inset-0 bg-paper opacity-95" />
          </motion.div>

          <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-1 text-center font-serif text-[#6e5336]">
            <span className="text-xs font-light">{coverLabel}</span>
            <span className="max-w-[12rem] truncate text-[11px] font-light text-[#8f6a3d]/75">
              จาก {senderName}
            </span>
          </div>
        </div>

        <motion.div
          className="flex max-w-sm flex-col items-center gap-8 text-center"
          animate={
            isOpening
              ? { opacity: 0, y: 12, filter: "blur(5px)" }
              : { opacity: 1, y: 0, filter: "blur(0px)" }
          }
          transition={{ duration: 0.85, ease: "easeInOut" }}
        >
          <p className="font-serif text-[1.08rem] font-light leading-relaxed tracking-normal text-[#fff7ea]/82 sm:text-xl">
            มีบางอย่างที่เราอยากให้เธอเปิดอ่านช้า ๆ
          </p>

          <button
            onClick={handleOpen}
            disabled={isOpening}
            className="rounded-full border border-[#c9a76a]/38 bg-[#f3e7d0]/8 px-8 py-3 text-sm font-light tracking-normal text-[#fff7ea]/76 shadow-[0_0_38px_rgba(201,167,106,0.09)] transition-all duration-500 hover:border-[#f3e7d0]/55 hover:bg-[#f3e7d0]/12 hover:text-[#fff7ea] focus:outline-none focus:ring-2 focus:ring-[#c9a76a]/40 disabled:pointer-events-none disabled:opacity-0"
          >
            เปิดจดหมาย
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
