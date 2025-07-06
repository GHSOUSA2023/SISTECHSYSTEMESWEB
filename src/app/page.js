'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


export default function Home() {
  const router = useRouter();
  return (
<div className="relative w-screen h-[600px] left-1/2 -translate-x-1/2">
  <Image
    src="/banner_accueil.png"
    alt="Sistech Systèmes - solutions numériques"
    fill
    sizes="100vw"
    className="object-contain"
    priority
  />
</div>

  );
}
