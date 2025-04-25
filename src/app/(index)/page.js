import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="w-full relative">
        <Image 
          src="/hero/1.jpg"
          alt="Hero image" 
          width={1200}
          height={800}
          className="w-full h-[40vh] object-cover object-bottom"
          priority
        />
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-4xl font-bold text-white text-center px-4">
          The best hotels are independent hotels.
        </h1>
      </div>
      </div>
    </div>
  );
}
