import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      <Image
        src="/hero.jpeg"
        alt="Knickolaus Mills"
        fill
        priority
        className="object-cover"
      />
    </div>
  );
}
