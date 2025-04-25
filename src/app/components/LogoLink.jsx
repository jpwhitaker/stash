'use client';

import Image from "next/image";

export default function LogoLink() {
  return (
    <a href="/" className="inline-block">
      <Image src="/logo.svg" alt="Stash Logo" width={200} height={40} />
    </a>
  );
}