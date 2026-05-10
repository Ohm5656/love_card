"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Copy, RotateCcw } from "lucide-react";
import { useState } from "react";

interface Props {
  photo: string;
  recipientName: string;
  senderName: string;
  anniversaryText: string;
  finalLines: string[];
  onReplay: () => void;
}

export default function FinalScene({
  photo,
  recipientName,
  senderName,
  anniversaryText,
  finalLines,
  onReplay,
}: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-5 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
      transition={{ duration: 1.05, ease: "easeOut" }}
    >
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[42%] h-[96vw] max-h-[760px] w-[96vw] max-w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(243,231,208,0.24)_0%,rgba(201,167,106,0.16)_40%,rgba(0,0,0,0)_72%)] blur-[86px]"
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease: "easeOut" }}
      />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mb-5 font-serif text-sm font-light text-[#c9a76a]/82"
        >
          สำหรับ {recipientName}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96, filter: "blur(16px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.45, ease: "easeOut", delay: 0.25 }}
          className="relative mb-10 aspect-[4/5] w-full max-w-[300px] rotate-[1.2deg] border border-[#fff7ea]/18 bg-[#f3e7d0] p-2.5 pb-11 shadow-[0_34px_84px_-24px_rgba(0,0,0,0.96)]"
        >
          <div className="relative h-full w-full overflow-hidden bg-[#1c1410] shadow-inner">
            <Image
              src={photo}
              alt="รูปสุดท้ายของความทรงจำ"
              fill
              sizes="(max-width: 768px) 300px, 330px"
              className="object-cover opacity-90 sepia-[0.08] transition-all duration-700 hover:opacity-100 hover:sepia-0"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_52%,rgba(18,13,10,0.28)_100%)]" />
          </div>
          <div className="absolute bottom-4 right-4 font-serif text-xs italic tracking-normal text-[#6e5336]/85">
            {anniversaryText}
          </div>
        </motion.div>

        <div className="mb-10 flex flex-col items-center gap-4 text-center font-serif">
          {finalLines.map((line, index) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.1, delay: 1.35 + index * 0.8 }}
              className={
                index === finalLines.length - 1
                  ? "mt-2 text-2xl font-normal leading-relaxed tracking-normal text-[#fff7ea] sm:text-3xl"
                  : "text-[1.08rem] font-light leading-relaxed tracking-normal text-[#fff7ea]/86 sm:text-xl"
              }
            >
              {line}
            </motion.p>
          ))}

          <motion.p
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, delay: 4.15 }}
            className="mt-5 text-sm font-light italic tracking-normal text-[#cdbfae]"
          >
            จาก {senderName}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 4.9 }}
          className="flex w-full flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button
            onClick={onReplay}
            className="flex min-h-11 w-full max-w-[210px] items-center justify-center gap-2 rounded-full border border-[#c9a76a]/28 bg-[#f3e7d0]/8 px-5 py-3 text-sm font-light tracking-normal text-[#fff7ea]/72 transition-all duration-500 hover:border-[#f3e7d0]/52 hover:bg-[#f3e7d0]/12 hover:text-[#fff7ea] focus:outline-none focus:ring-2 focus:ring-[#c9a76a]/35"
          >
            <RotateCcw className="h-4 w-4" />
            ดูอีกครั้ง
          </button>

          <button
            onClick={handleCopyLink}
            className="flex min-h-11 w-full max-w-[210px] items-center justify-center gap-2 rounded-full border border-[#c9a76a]/28 bg-[#f3e7d0]/8 px-5 py-3 text-sm font-light tracking-normal text-[#fff7ea]/72 transition-all duration-500 hover:border-[#f3e7d0]/52 hover:bg-[#f3e7d0]/12 hover:text-[#fff7ea] focus:outline-none focus:ring-2 focus:ring-[#c9a76a]/35"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-[#c9a76a]" />
                คัดลอกแล้ว
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                คัดลอกลิงก์
              </>
            )}
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
