import Image from "next/image";

export default function Home() {
  return (
    <div className="flex items-center justify-center p-8">
      <Image
        src="/hero.jpeg"
        alt="Knicklaus"
        width={600}
        height={600}
        priority
        className="rounded-lg shadow-2xl shadow-white/5 max-w-full h-auto"
      />
    </div>
  );
}
