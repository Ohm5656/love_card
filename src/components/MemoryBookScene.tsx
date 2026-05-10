"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface AlbumPage {
  caption: string;
  note: string;
  photos: string[];
}

interface Props {
  bookSubtitle: string;
  bookTitle: string;
  pages: AlbumPage[];
  onNext: () => void;
}

export default function MemoryBookScene({
  bookSubtitle,
  bookTitle,
  pages,
  onNext,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [turningPage, setTurningPage] = useState<{
    direction: "next" | "prev";
    fromIndex: number;
    toIndex: number;
  } | null>(null);

  const canGoBack = pageIndex > 0;
  const canGoNext = pageIndex + 1 < pages.length;
  const isTurning = turningPage !== null;
  const visiblePage = turningPage ? pages[turningPage.toIndex] : pages[pageIndex];
  const currentPageNumber = pageIndex + 1;
  const totalPages = pages.length;

  const goBack = () => {
    if (!canGoBack || isTurning) {
      return;
    }

    setTurningPage({
      direction: "prev",
      fromIndex: pageIndex,
      toIndex: pageIndex - 1,
    });
  };

  const goNext = () => {
    if (!canGoNext || isTurning) {
      return;
    }

    setTurningPage({
      direction: "next",
      fromIndex: pageIndex,
      toIndex: pageIndex + 1,
    });
  };

  const finishPageTurn = () => {
    if (!turningPage) {
      return;
    }

    setPageIndex(turningPage.toIndex);
    setTurningPage(null);
  };

  return (
    <motion.div
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-4 py-7"
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
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[43%] h-[68vh] w-[92vw] max-w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a76a]/14 blur-[105px]"
        animate={{ opacity: isOpen ? 1 : 0.5, scale: isOpen ? 1.05 : 0.92 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
      />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center">
        <div className="relative mb-6 aspect-[4/5] w-full max-w-[335px] [perspective:2200px] sm:max-w-[420px] md:max-w-[500px]">
          <div className="absolute bottom-0 left-[8%] right-[8%] h-9 rounded-full bg-black/65 blur-2xl" />

          <motion.div
            className="absolute inset-0 rounded-md bg-[#f3e7d0]/8 blur-2xl"
            animate={{ opacity: isOpen ? 0.88 : 0.3, scale: isOpen ? 1 : 0.86 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />

          <div className="absolute inset-3 rotate-[1.4deg] rounded-md border border-[#c9a76a]/18 bg-paper/60 shadow-[16px_28px_70px_rgba(0,0,0,0.45)]" />
          <div className="absolute inset-2 overflow-hidden rounded-md border border-[#c9a76a]/32 bg-paper p-3 shadow-[18px_30px_78px_rgba(0,0,0,0.68)] sm:p-4">
            <MemoryPage page={visiblePage} />
          </div>

          <motion.div
            className="pointer-events-none absolute inset-0 z-20 origin-left rounded-lg shadow-[24px_28px_78px_rgba(0,0,0,0.76)]"
            initial={{ opacity: 1, rotateY: 0 }}
            animate={{ opacity: isOpen ? 0 : 1, rotateY: isOpen ? -176 : 0 }}
            transition={{
              rotateY: { duration: 1.6, ease: [0.25, 1, 0.5, 1] },
              opacity: {
                duration: isOpen ? 0.35 : 0.2,
                delay: isOpen ? 1.25 : 0,
                ease: "easeOut",
              },
            }}
            style={{ transformStyle: "preserve-3d" }}
          >
            <div
              className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-lg border border-[#8f6a3d]/42 bg-[#211510]"
              style={{ backfaceVisibility: "hidden" }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(201,167,106,0.2),transparent_50%),linear-gradient(135deg,rgba(255,247,234,0.08),transparent)]" />
              <div className="relative mx-7 flex h-[64%] w-[68%] flex-col items-center justify-center rounded-sm border border-[#c9a76a]/26 px-4 text-center font-serif shadow-inner">
                <p className="text-xl font-medium leading-relaxed text-[#f3e7d0] sm:text-3xl">
                  {bookTitle}
                </p>
                <div className="my-4 h-px w-16 bg-[#c9a76a]/36" />
                <p className="max-w-[15rem] text-xs font-light leading-relaxed text-[#cdbfae]/72 sm:text-sm">
                  {bookSubtitle}
                </p>
              </div>
            </div>

            <div
              className="absolute inset-0 rounded-lg border border-[#8f6a3d]/22 bg-[#120d0a]"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
              }}
            />
          </motion.div>

          <motion.div
            className="absolute inset-y-1 left-1.5 z-30 w-3 rounded-full bg-[linear-gradient(90deg,#0c0907,#2b1f18_48%,#0c0907)] shadow-[0_0_18px_rgba(0,0,0,0.8)]"
            animate={{ opacity: isOpen ? 1 : 0.62 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />

          {turningPage && (
            <TurningPage
              direction={turningPage.direction}
              frontPage={pages[turningPage.fromIndex]}
              backPage={pages[turningPage.toIndex]}
              onComplete={finishPageTurn}
            />
          )}
        </div>

        {!isOpen ? (
          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="rounded-full border border-[#c9a76a]/34 bg-[#f3e7d0]/8 px-8 py-3 text-sm font-light tracking-normal text-[#fff7ea]/76 shadow-[0_0_34px_rgba(201,167,106,0.08)] transition-all duration-500 hover:border-[#f3e7d0]/52 hover:bg-[#f3e7d0]/12 hover:text-[#fff7ea] focus:outline-none focus:ring-2 focus:ring-[#c9a76a]/35"
          >
            เปิดสมุดความทรงจำ
          </motion.button>
        ) : (
          <motion.div
            className="flex w-full max-w-xl flex-col items-center gap-5"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45 }}
          >
            <div className="flex items-center gap-4">
              <button
                onClick={goBack}
                disabled={!canGoBack || isTurning}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c9a76a]/28 bg-[#f3e7d0]/8 text-[#fff7ea]/76 transition-all duration-500 hover:border-[#f3e7d0]/52 hover:bg-[#f3e7d0]/12 hover:text-[#fff7ea] disabled:pointer-events-none disabled:opacity-30"
                aria-label="หน้าก่อนหน้า"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <p className="font-serif text-sm font-light text-[#cdbfae]">
                {currentPageNumber} / {totalPages}
              </p>
              <button
                onClick={goNext}
                disabled={!canGoNext || isTurning}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c9a76a]/28 bg-[#f3e7d0]/8 text-[#fff7ea]/76 transition-all duration-500 hover:border-[#f3e7d0]/52 hover:bg-[#f3e7d0]/12 hover:text-[#fff7ea] disabled:pointer-events-none disabled:opacity-30"
                aria-label="หน้าถัดไป"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={onNext}
              className="rounded-full border border-[#c9a76a]/34 bg-[#f3e7d0]/8 px-8 py-3 text-sm font-light tracking-normal text-[#fff7ea]/76 shadow-[0_0_34px_rgba(201,167,106,0.08)] transition-all duration-500 hover:border-[#f3e7d0]/52 hover:bg-[#f3e7d0]/12 hover:text-[#fff7ea] focus:outline-none focus:ring-2 focus:ring-[#c9a76a]/35"
            >
              อ่านจดหมายที่เราเขียนไว้
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function MemoryPage({ page }: { page?: AlbumPage }) {
  if (!page) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center rounded-sm bg-[#1c1410]/8 p-4 text-center font-serif shadow-inner">
        <p className="text-base font-light leading-relaxed text-[#6e5336]/70">
          หน้าที่เหลือ
          <br />
          คือความทรงจำที่เราจะสร้างต่อจากนี้
        </p>
      </div>
    );
  }

  return (
    <div className="h-full w-full rounded-sm bg-[#1c1410]/8 p-3 shadow-inner sm:p-4">
      <div className="grid h-full w-full grid-cols-2 grid-rows-3 gap-2 sm:gap-3">
        {page.photos.slice(0, 6).map((photo, index) => (
          <motion.div
            key={`${photo}-${index}`}
            className={[
              "relative overflow-hidden border border-[#fff7ea]/55 bg-[#f3e7d0] p-1 shadow-[0_10px_22px_rgba(0,0,0,0.18)]",
              index === 1 ? "rotate-[1.1deg]" : "",
              index === 2 ? "rotate-[-0.9deg]" : "",
              index === 3 ? "rotate-[0.8deg]" : "",
              index === 4 ? "rotate-[-0.8deg]" : "",
              index === 5 ? "rotate-[0.9deg]" : "",
            ].join(" ")}
            initial={false}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[1px] bg-[#1c1410]">
              <Image
                src={photo}
                alt={`${page.caption} ${index + 1}`}
                fill
                sizes="(max-width: 768px) 42vw, 220px"
                className="object-cover opacity-[0.92] sepia-[0.08]"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TurningPage({
  direction,
  frontPage,
  backPage,
  onComplete,
}: {
  direction: "next" | "prev";
  frontPage?: AlbumPage;
  backPage?: AlbumPage;
  onComplete: () => void;
}) {
  const isNext = direction === "next";

  return (
    <motion.div
      className={[
        "absolute inset-2 z-[35] overflow-visible rounded-md",
        isNext ? "origin-left" : "origin-right",
      ].join(" ")}
      initial={{ opacity: 1, rotateY: 0 }}
      animate={{ opacity: 0, rotateY: isNext ? -178 : 178 }}
      transition={{
        rotateY: { duration: 0.98, ease: [0.25, 1, 0.5, 1] },
        opacity: { duration: 0.24, delay: 0.74, ease: "easeOut" },
      }}
      style={{ transformStyle: "preserve-3d" }}
      onAnimationComplete={onComplete}
    >
      <div
        className="absolute inset-0 overflow-hidden rounded-md border border-[#c9a76a]/34 bg-paper p-3 shadow-[18px_28px_72px_rgba(0,0,0,0.58)] sm:p-4"
        style={{ backfaceVisibility: "hidden" }}
      >
        <MemoryPage page={frontPage} />
        <div
          className={[
            "pointer-events-none absolute inset-y-0 w-10",
            isNext
              ? "left-0 bg-gradient-to-r from-black/18 to-transparent"
              : "right-0 bg-gradient-to-l from-black/18 to-transparent",
          ].join(" ")}
        />
      </div>

      <div
        className="absolute inset-0 overflow-hidden rounded-md border border-[#c9a76a]/34 bg-paper p-3 shadow-[18px_28px_72px_rgba(0,0,0,0.48)] sm:p-4"
        style={{
          backfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
        }}
      >
        <MemoryPage page={backPage} />
        <div
          className={[
            "pointer-events-none absolute inset-y-0 w-10",
            isNext
              ? "right-0 bg-gradient-to-l from-black/18 to-transparent"
              : "left-0 bg-gradient-to-r from-black/18 to-transparent",
          ].join(" ")}
        />
      </div>
    </motion.div>
  );
}
