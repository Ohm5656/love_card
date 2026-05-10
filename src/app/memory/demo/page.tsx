"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import EnvelopeScene from "@/components/EnvelopeScene";
import FirstMemoryScene from "@/components/FirstMemoryScene";
import LittleThingsScene from "@/components/LittleThingsScene";
import MemoryBookScene from "@/components/MemoryBookScene";
import LetterScene from "@/components/LetterScene";
import FinalScene from "@/components/FinalScene";

type WebAudioWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

const memoryData = {
  recipientName: "เธอ",
  senderName: "คนที่ยังเลือกเธอเสมอ",
  anniversaryText: "สุขสันต์วันครบรอบนะ",
  coverLabel: "เปิดเมื่อพร้อมนะ",
  firstQuestion: "คุณจำได้มั้ย",
  firstLine: "วันแรกที่เราได้เจอกัน",
  favoriteLine: "ขอบคุณที่อยู่ด้วยกันจนถึงตอนนี้นะ",
  bookTitle: "สมุดความทรงจำของเราทั้งสองคน",
  bookSubtitle: "เปิดดูทีละหน้า เหมือนเรากลับไปอยู่ในวันนั้นอีกครั้ง",
  photos: [
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=900&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=900&auto=format&fit=crop",
  ],
  favoriteCaptions: [
    "รูปที่เรายิ้มโดยไม่ต้องพยายาม",
    "วันที่ธรรมดา แต่เราจำได้เสมอ",
    "ช่วงเวลาที่อยากเก็บไว้ตลอดไป",
  ],
  albumPages: [
    {
      caption: "หน้าแรก",
      note: "วันที่เราเริ่มรู้สึกว่า โลกของเรามีเธอเพิ่มเข้ามา",
      photos: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=900&auto=format&fit=crop",
      ],
    },
    {
      caption: "วันที่ยิ้มง่าย",
      note: "บางวันไม่ได้พิเศษสำหรับใคร แต่พิเศษสำหรับเรามาก",
      photos: [
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=900&auto=format&fit=crop",
      ],
    },
    {
      caption: "อยู่ข้างกัน",
      note: "ขอบคุณที่ยังจับมือกัน แม้วันที่ไม่ได้ง่ายเหมือนในรูป",
      photos: [
        "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=900&auto=format&fit=crop",
      ],
    },
    {
      caption: "เรื่องเล็ก ๆ",
      note: "เราชอบที่ความสุขของเราเกิดจากเรื่องเล็ก ๆ แบบนี้",
      photos: [
        "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop",
      ],
    },
    {
      caption: "จนถึงวันนี้",
      note: "ตลอดเวลาที่ผ่านมา เธอยังเป็นคนที่เราอยากกลับมาเจอเสมอ",
      photos: [
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=900&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?q=80&w=900&auto=format&fit=crop",
      ],
    },
  ],
  letterLines: [
    "ขอบคุณที่อยู่ข้างกันมาตลอด",
    "ขอบคุณที่ทำให้วันธรรมดาของเรามีความหมาย",
    "เราอาจไม่ได้พูดเก่ง แต่ทุกอย่างในนี้คือความรู้สึกจริง ๆ ของเรา",
    "ถ้าวันไหนเธอเหนื่อย อยากให้รู้ว่ายังมีเราอยู่ตรงนี้เสมอ",
  ],
  finalLines: [
    "ถ้าย้อนกลับไปได้",
    "เราก็ยังอยากเจอเธออีกครั้งอยู่ดี",
    "สุขสันต์วันครบรอบนะ",
  ],
};

export default function MemoryDemoPage() {
  const [currentScene, setCurrentScene] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);

  const unlockTypingAudio = useCallback(() => {
    const AudioContextCtor =
      window.AudioContext ?? (window as WebAudioWindow).webkitAudioContext;

    if (!AudioContextCtor) {
      return;
    }

    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContextCtor();
    }

    void audioContextRef.current.resume();
  }, []);

  const playTypingTick = useCallback(() => {
    const context = audioContextRef.current;

    if (!context || context.state === "closed") {
      return;
    }

    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;

    oscillator.type = "triangle";
    oscillator.frequency.value = 680 + Math.random() * 120;
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.035, now + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.045);

    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.055);
  }, []);

  const handleNext = () => {
    setCurrentScene((prev) => Math.min(prev + 1, 5));
  };

  const handleReplay = () => {
    setCurrentScene(0);
  };

  return (
    <main className="relative min-h-[100dvh] w-full overflow-hidden bg-[#090706] font-sans text-[#fff7ea]">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_16%,rgba(201,167,106,0.18),transparent_32%),radial-gradient(circle_at_18%_80%,rgba(185,130,122,0.14),transparent_30%),linear-gradient(180deg,#120d0a_0%,#090706_50%,#030201_100%)]" />
      <div className="bg-grain" />

      <AnimatePresence mode="wait">
        {currentScene === 0 && (
          <EnvelopeScene
            key="scene1"
            coverLabel={memoryData.coverLabel}
            recipientName={memoryData.recipientName}
            senderName={memoryData.senderName}
            onOpenSoundUnlock={unlockTypingAudio}
            onNext={handleNext}
          />
        )}
        {currentScene === 1 && (
          <FirstMemoryScene
            key="scene2"
            caption="รูปแรกที่เราอยากเก็บไว้ในเรื่องของเรา"
            question={memoryData.firstQuestion}
            line={memoryData.firstLine}
            photo={memoryData.photos[0]}
            onType={playTypingTick}
            onNext={handleNext}
          />
        )}
        {currentScene === 2 && (
          <LittleThingsScene
            key="scene3"
            captions={memoryData.favoriteCaptions}
            closingLine={memoryData.favoriteLine}
            photos={memoryData.photos.slice(1, 4)}
            onType={playTypingTick}
            onNext={handleNext}
          />
        )}
        {currentScene === 3 && (
          <MemoryBookScene
            key="scene4"
            bookSubtitle={memoryData.bookSubtitle}
            bookTitle={memoryData.bookTitle}
            pages={memoryData.albumPages}
            onNext={handleNext}
          />
        )}
        {currentScene === 4 && (
          <LetterScene
            key="scene5"
            lines={memoryData.letterLines}
            recipientName={memoryData.recipientName}
            senderName={memoryData.senderName}
            onNext={handleNext}
          />
        )}
        {currentScene === 5 && (
          <FinalScene
            key="scene6"
            photo={memoryData.photos[5]}
            recipientName={memoryData.recipientName}
            senderName={memoryData.senderName}
            anniversaryText={memoryData.anniversaryText}
            finalLines={memoryData.finalLines}
            onReplay={handleReplay}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
