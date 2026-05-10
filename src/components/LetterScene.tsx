"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  lines: string[];
  recipientName: string;
  senderName: string;
  onNext: () => void;
}

export default function LetterScene({
  lines,
  recipientName,
  senderName,
  onNext,
}: Props) {
  const [isOpened, setIsOpened] = useState(false);
  const revealDelay = 1.3;

  return (
    <motion.div
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-5 py-6"
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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_36%,rgba(243,231,208,0.2),transparent_36%),radial-gradient(circle_at_50%_78%,rgba(201,167,106,0.16),transparent_34%),linear-gradient(180deg,rgba(9,7,6,0.04),rgba(9,7,6,0.68))]" />

      <div className="relative z-10 flex w-full max-w-lg flex-col items-center">
        <div className="relative h-[690px] max-h-[calc(100dvh-48px)] w-full [perspective:1800px]">
          <motion.div
            className="absolute left-1/2 top-[38%] h-56 w-[88%] -translate-x-1/2 rounded-full bg-[#c9a76a]/16 blur-[70px]"
            animate={{
              opacity: isOpened ? 0.92 : 0.55,
              scale: isOpened ? 1.12 : 0.9,
            }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />

          <motion.div
            className="absolute left-1/2 top-[40px] z-20 w-full max-w-[480px] -translate-x-1/2"
            initial={false}
            animate={{
              opacity: isOpened ? 1 : 0,
              y: isOpened ? 0 : 160,
              rotateX: isOpened ? 0 : -8,
              scale: isOpened ? 1 : 0.92,
              filter: isOpened ? "blur(0px)" : "blur(10px)",
            }}
            transition={{
              duration: 1.15,
              delay: isOpened ? 0.42 : 0,
              ease: [0.25, 1, 0.5, 1],
            }}
          >
            <motion.div
              className="relative min-h-[510px] w-full rotate-[-0.3deg] border border-[#c9a76a]/24 bg-paper px-7 py-10 shadow-[0_34px_82px_-22px_rgba(0,0,0,0.92)] sm:min-h-[540px] sm:px-11 sm:py-12"
              animate={{
                rotate: isOpened ? [-0.3, 0.25, -0.15] : -0.3,
              }}
              transition={{
                duration: 5,
                repeat: isOpened ? Infinity : 0,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            >
              <div className="pointer-events-none absolute inset-3 border border-[#c9a76a]/16" />
              <div className="pointer-events-none absolute inset-x-8 top-16 h-px bg-[#8f6a3d]/12" />
              <div className="pointer-events-none absolute inset-x-8 top-[104px] h-px bg-[#8f6a3d]/10" />
              <div className="pointer-events-none absolute inset-y-8 left-9 w-px bg-[#b9827a]/14" />

              <motion.div
                initial={false}
                animate={{ opacity: isOpened ? 1 : 0 }}
                transition={{ duration: 0.8, delay: revealDelay }}
                className="mb-8 flex items-center justify-between gap-4 font-serif text-[11px] font-light text-[#8f6a3d]/74"
              >
                <span>ถึง {recipientName}</span>
                <span>จาก {senderName}</span>
              </motion.div>

              <motion.h2
                initial={false}
                animate={{
                  opacity: isOpened ? 1 : 0,
                  y: isOpened ? 0 : 12,
                  filter: isOpened ? "blur(0px)" : "blur(8px)",
                }}
                transition={{ duration: 0.95, delay: revealDelay + 0.22 }}
                className="mb-8 text-center font-serif text-xl font-medium leading-relaxed tracking-normal text-[#1c1410] sm:text-2xl"
              >
                จดหมายที่เราอยากให้เธออ่านช้า ๆ
              </motion.h2>

              <div className="flex flex-col gap-4 text-center font-serif sm:gap-5">
                {lines.map((line, index) => (
                  <motion.p
                    key={line}
                    initial={false}
                    animate={{
                      opacity: isOpened ? 1 : 0,
                      y: isOpened ? 0 : 12,
                      filter: isOpened ? "blur(0px)" : "blur(8px)",
                    }}
                    transition={{
                      duration: 0.95,
                      delay: revealDelay + 0.78 + index * 0.72,
                    }}
                    className="text-[0.98rem] font-normal leading-relaxed tracking-normal text-[#2f261d] sm:text-lg"
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <motion.div
                initial={false}
                animate={{
                  opacity: isOpened ? 1 : 0,
                  y: isOpened ? 0 : 8,
                  filter: isOpened ? "blur(0px)" : "blur(5px)",
                }}
                transition={{
                  duration: 0.85,
                  delay: revealDelay + 1.1 + lines.length * 0.72,
                }}
                className="mt-9 flex justify-center sm:mt-11"
              >
                <button
                  onClick={onNext}
                  className="rounded-full border border-[#8f6a3d]/35 px-7 py-3 text-sm font-light tracking-normal text-[#5d4730] transition-all duration-500 hover:border-[#1c1410]/45 hover:bg-[#1c1410]/6 hover:text-[#1c1410] focus:outline-none focus:ring-2 focus:ring-[#8f6a3d]/30"
                >
                  ไปยังรูปสุดท้าย
                </button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-[82px] left-1/2 h-[236px] w-full max-w-[470px] -translate-x-1/2"
            initial={{ opacity: 0, y: 24, filter: "blur(14px)" }}
            animate={{
              opacity: isOpened ? 0.5 : 1,
              y: isOpened ? 132 : 0,
              scale: isOpened ? 0.9 : 1,
              filter: "blur(0px)",
            }}
            style={{ zIndex: isOpened ? 10 : 30 }}
            transition={{
              opacity: { duration: 1.1, ease: "easeOut" },
              y: { duration: 1.05, ease: [0.25, 1, 0.5, 1] },
              scale: { duration: 1.05, ease: [0.25, 1, 0.5, 1] },
            }}
          >
            <button
              type="button"
              onClick={() => setIsOpened(true)}
              disabled={isOpened}
              className="group relative block h-full w-full cursor-pointer border-0 bg-transparent p-0 text-left disabled:cursor-default"
              aria-label="เปิดจดหมาย"
            >
              <div className="absolute inset-x-0 bottom-0 h-[170px] overflow-hidden rounded-md border border-[#c9a76a]/26 bg-paper shadow-[0_30px_82px_-24px_rgba(0,0,0,0.9)]">
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_49.5%,rgba(143,106,61,0.2)_50%,transparent_50.5%),linear-gradient(45deg,transparent_49.5%,rgba(143,106,61,0.17)_50%,transparent_50.5%)]" />
                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 text-center font-serif text-sm font-light leading-relaxed text-[#8f6a3d]/72">
                  <p>เปิดเมื่อพร้อมนะ</p>
                  <p className="mt-1 text-xs">จาก {senderName}</p>
                </div>
              </div>

              <motion.div
                className="absolute left-1/2 top-0 h-[154px] w-[78%] -translate-x-1/2 origin-bottom bg-[#f3e7d0] shadow-[0_18px_42px_rgba(0,0,0,0.18)] [clip-path:polygon(0_0,100%_0,50%_100%)]"
                initial={false}
                animate={{
                  rotateX: isOpened ? 178 : 0,
                  y: isOpened ? -10 : 0,
                  opacity: isOpened ? 0.28 : 1,
                }}
                transition={{
                  rotateX: { duration: 0.95, ease: [0.25, 1, 0.5, 1] },
                  opacity: { duration: 0.45, delay: isOpened ? 0.72 : 0 },
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="h-full w-full bg-[radial-gradient(circle_at_50%_70%,rgba(201,167,106,0.2),transparent_50%)]" />
              </motion.div>

              <motion.div
                className="absolute bottom-[70px] left-1/2 h-12 w-12 -translate-x-1/2 rounded-full border border-[#8f6a3d]/28 bg-[#b9827a]/78 shadow-[0_12px_28px_rgba(0,0,0,0.28)]"
                animate={{
                  opacity: isOpened ? 0 : 1,
                  scale: isOpened ? 0.68 : 1,
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <span className="flex h-full w-full items-center justify-center font-serif text-sm text-[#fff7ea]/88">
                  รัก
                </span>
              </motion.div>
            </button>
          </motion.div>
        </div>

        {!isOpened && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75 }}
            className="absolute bottom-8 z-20 flex justify-center"
          >
            <button
              onClick={() => setIsOpened(true)}
              className="rounded-full border border-[#c9a76a]/34 bg-[#f3e7d0]/8 px-8 py-3 text-sm font-light tracking-normal text-[#fff7ea]/76 shadow-[0_0_34px_rgba(201,167,106,0.08)] transition-all duration-500 hover:border-[#f3e7d0]/52 hover:bg-[#f3e7d0]/12 hover:text-[#fff7ea] focus:outline-none focus:ring-2 focus:ring-[#c9a76a]/35"
            >
              เปิดจดหมาย
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
