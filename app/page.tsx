import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      <Image
        src="/hero.jpeg"
        alt="Knickolaus Mills"
        width={1200}
        height={1200}
        priority
        className="w-full h-auto"
      />
    </div>
  );
}
