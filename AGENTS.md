<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project Brief

This project is an interactive anniversary gift website priced as a simple single-offer product: 199 THB.

Do not treat it as a generic "anniversary card" site. The intended experience is closer to:

- a living love letter
- a memory scrapbook
- a quiet wedding-film-style short story

The recipient should open the link and feel:

> "They really made this for me."

The product should transform real couple photos and heartfelt words into a cinematic, intimate memory website. The emotional pacing matters as much as the UI.

# Product North Star

Create a recipient-facing anniversary memory experience that feels quiet, deep, premium, cinematic, romantic, and personal.

It should feel like:

- a private love letter
- a warm memory book
- a wedding film
- a slow reveal of meaningful moments
- something intentionally made for one person

It should not feel like:

- a childish cute card
- a generic Valentine template
- a pink/red heart-heavy page
- a fast animated greeting card
- a stock online card
- a template with photos and text pasted in

# Current Scope

Build only the recipient-facing experience first.

The first demo route is:

```txt
/memory/demo
```

This MVP must not include:

- authentication
- payment
- creator form
- real upload flow
- dashboard
- full backend
- database

Use mock data for now. The demo must still feel polished and emotionally convincing, because this page is the sales proof.

# Tech Stack

Use:

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion

Avoid heavy 3D libraries such as Three.js for the MVP. Prefer CSS transforms, perspective, rotateY illusions, opacity, scale, translate, and Framer Motion transitions.

Use Next Image for real photos or realistic future photo handling where appropriate.

# Mobile First

Design for mobile first. Most recipients will open the link on a phone.

Test and reason about:

- 360px Android width
- 390px iPhone width
- tablet
- desktop

Mobile requirements:

- buttons must be easy to tap
- text must not feel crowded
- photos must not overflow
- letters must be readable without exhausting scroll
- motion must remain smooth
- the scene should feel intentional even on a small screen

# Experience Structure

The website is a 6-scene controlled experience.

Do not build it as a normal scrolling page. Use state to control scenes and let the recipient advance step by step.

Example:

```tsx
const [currentScene, setCurrentScene] = useState(0);

const nextScene = () => {
  setCurrentScene((prev) => Math.min(prev + 1, scenes.length - 1));
};

const replay = () => {
  setCurrentScene(0);
};
```

Use `AnimatePresence` from Framer Motion for scene transitions.

Recommended component structure:

```txt
components/EnvelopeScene.tsx
components/FirstMemoryScene.tsx
components/LittleThingsScene.tsx
components/MemoryBookScene.tsx
components/LetterScene.tsx
components/FinalScene.tsx
```

Each scene should receive data through props. Keep mock data near the top of `/memory/demo/page.tsx` so it can later be replaced by data from a creator form or database.

# Mock Data Shape

Use a structure similar to:

```tsx
const memoryData = {
  recipientName: "เธอ",
  senderName: "คนที่ยังเลือกเธอเสมอ",
  anniversaryText: "สุขสันต์วันครบรอบนะ",
  photos: [
    "/demo/photo-1.jpg",
    "/demo/photo-2.jpg",
    "/demo/photo-3.jpg",
    "/demo/photo-4.jpg",
    "/demo/photo-5.jpg",
    "/demo/photo-6.jpg",
  ],
  letterLines: [
    "ขอบคุณที่อยู่ข้างกันมาตลอด",
    "ขอบคุณที่ทำให้วันธรรมดาของเรามีความหมาย",
    "เราอาจไม่ได้พูดเก่ง แต่ทุกอย่างในนี้คือความรู้สึกจริง ๆ ของเรา",
  ],
  finalLines: [
    "ถ้าย้อนกลับไปได้",
    "เราก็ยังอยากเจอเธออีกครั้งอยู่ดี",
    "สุขสันต์วันครบรอบนะ",
  ],
};
```

# Scene Direction

## Scene 1: Silent Opening

Goal: Make the recipient feel they are about to open something made specifically for them.

Visual direction:

- soft dark screen
- envelope centered
- subtle warm glow around or inside the envelope
- subtle grain
- cinematic background

Text:

```txt
มีบางอย่างที่เราอยากให้เธอเปิดอ่านช้า ๆ
```

Button:

```txt
เปิดจดหมาย
```

Motion:

- envelope opens slowly
- warm light comes from inside
- no bouncy or playful animation
- transition to Scene 2 after the opening beat

## Scene 2: First Memory

Goal: Bring the recipient back to the beginning of the relationship feeling.

Visual direction:

- first important photo fades in slowly
- photo can float or scale subtly
- text reveals line by line

Text:

```txt
เรายังจำได้…
วันที่เธอเริ่มกลายเป็นคนพิเศษของเรา
```

Button:

```txt
ไปยังความทรงจำถัดไป
```

## Scene 3: Little Things

Goal: Show that the sender remembers ordinary moments, not only big milestones.

Visual direction:

- three small photo cards or polaroids
- staggered entrance
- slight rotation
- soft shadows
- like old photos on a table or memories floating up

Text:

```txt
บางความทรงจำอาจดูธรรมดา
แต่สำหรับเรา มันคือวันที่อยากเก็บไว้เสมอ
```

Button:

```txt
เปิดสมุดความทรงจำ
```

## Scene 4: Memory Book

Goal: This is the emotional centerpiece. It must separate the product from ordinary online cards.

Visual direction:

- slightly darker background
- premium warm romantic book floating in the center
- book opens with a 2.5D CSS perspective illusion
- paper texture
- page shadow
- soft glow
- 6-10 memory photos inside as a gallery, spread, layered pages, or flip illusion

Text:

```txt
ตลอดเวลาที่ผ่านมา
เราไม่ได้จำได้แค่วันที่มีความสุข
แต่เราจำได้ด้วยว่า
เธอยังอยู่ในวันที่มันไม่ง่าย
```

Button:

```txt
เปิดจดหมายจากใจ
```

Emotional intent: The relationship was not only beautiful on good days. It mattered because both people stayed through difficult days too.

## Scene 5: Letter

Goal: This is the heart of the product. It should feel like reading a real private letter.

Visual direction:

- a letter sheet floats up after the memory book
- paper texture
- warm light
- not a generic text box

Heading:

```txt
มีบางอย่างที่เราอยากบอกเธอจริง ๆ
```

Example letter lines:

```txt
ขอบคุณที่อยู่ข้างกันมาตลอด
ขอบคุณที่ทำให้วันธรรมดาของเรามีความหมาย
เราอาจไม่ได้พูดเก่ง แต่ทุกอย่างในนี้คือความรู้สึกจริง ๆ ของเรา
```

Button:

```txt
อ่านข้อความสุดท้าย
```

Motion:

- reveal line by line
- slow enough to read
- quiet, deep, sincere
- no long paragraph appearing all at once

## Scene 6: Final

Goal: End warmly with one memorable final thought.

Visual direction:

- final couple photo or most meaningful photo
- warm glow rises gently
- background becomes slightly brighter
- feels like the ending of a short film

Text:

```txt
ถ้าย้อนกลับไปได้
เราก็ยังอยากเจอเธออีกครั้งอยู่ดี
สุขสันต์วันครบรอบนะ
```

Signature:

```txt
จาก คนที่ยังเลือกเธอเสมอ
```

Buttons:

```txt
ดูอีกครั้ง
คัดลอกลิงก์
```

Replay returns to Scene 1.

# Visual Style

Use:

- soft glow
- subtle grain
- paper texture
- warm light
- dark cinematic background
- slow fades
- depth in photos
- soft shadow
- gentle blur only when needed
- responsive mobile layout

Avoid:

- bright pink
- bright red
- neon purple
- heart gradients
- lots of floating hearts
- confetti
- cartoon style
- bouncy animations
- generic card UI
- overly busy effects

# Typography

Recommended fonts:

- Noto Serif Thai
- Noto Sans Thai
- Inter

Usage:

- Use Noto Serif Thai for headings, letter text, emotional lines, and cinematic copy.
- Use Noto Sans Thai for buttons, utility UI, and easy mobile reading.
- Use Inter as a fallback for English and numbers.

Noto Serif Thai helps the product feel like a letter, a wedding film, and a memory book. Avoid type choices that make the experience feel like a modern SaaS app.

# Color Palette

Use warm, dark, soft, premium tones.

Suggested colors:

```txt
Background dark: #120D0A
Deep brown:      #1C1410
Warm black:      #090706
Paper cream:     #F3E7D0
Muted gold:      #C9A76A
Soft rose:       #B9827A
Text warm white: #FFF7EA
Muted text:      #CDBFAE
```

Avoid saturated pink, saturated red, neon purple, heart gradients, and cartoon-like sweetness.

# Motion Rules

Motion should be slow, readable, and emotionally meaningful.

Suggested timing:

- scene transition: 0.8s to 1.5s
- photo fade: 1.2s to 2s
- text reveal delay: 0.4s to 0.8s per line
- envelope opening: 1s to 1.5s
- book opening: 1.2s to 2s
- letter reveal: slow and readable

Rules:

- do not animate too fast
- do not use strong bounce
- do not create dizzy motion
- make sure users can read each line
- use motion to deepen the feeling, not to excite like a game
- support reduced motion where practical

# Audio Direction

The MVP should not rely on music.

Future audio direction:

- The project may add soft royalty-free piano music later.
- Never use copyrighted commercial music unless the license is clear and documented.
- Keep proof of music license/source in the repo or project docs when music is added.
- Audio must be optional and user-controlled.
- Browsers usually block autoplay with sound, so start audio only after a user action.
- Provide mute/unmute and avoid making the experience depend on sound.
- Prefer quiet ambient piano that supports the letter-like mood instead of dramatic or distracting music.

Small sound effects, such as paper movement, may be added later if they are subtle, licensed, and do not make the experience feel gimmicky.

# Performance Rules

Use:

- CSS transform
- Framer Motion
- opacity
- scale
- translate
- perspective
- rotateY
- lightweight blur

Be careful with:

- large images
- heavy blur
- too many simultaneous shadows
- excessive backdrop-filter on mobile
- too many simultaneous animations

Optimize images and keep the first load fast. The emotional pacing should come from storytelling, not loading delays.

# Implementation Standards

When implementing:

- Keep scenes as separate components.
- Pass all content through props.
- Keep copy and mock data easy to replace.
- Use semantic buttons for navigation.
- Keep focus states visible and tasteful.
- Keep responsive constraints explicit.
- Do not hardcode layout that only works on desktop.
- Avoid adding backend complexity during MVP.
- Avoid unrelated refactors.

For visual assets:

- Use realistic placeholder couple photos or tasteful generated placeholders.
- Avoid generic illustrations unless they serve the scene.
- Future real user photos should be optimized with Next Image.

# Acceptance Checklist For `/memory/demo`

Before considering the demo good enough:

- The page opens directly at `/memory/demo`.
- The recipient can progress through all 6 scenes.
- Replay returns to Scene 1.
- Mock data is centralized and passed through props.
- The page feels best on mobile.
- Text is readable at 360px and 390px widths.
- Animations are slow and cinematic.
- The Memory Book scene feels like the centerpiece.
- The Letter scene feels sincere, not like a text card.
- No copyrighted music is included.
- No heavy 3D library is used.
- The visual tone is warm, dark, premium, and romantic without becoming childish.
