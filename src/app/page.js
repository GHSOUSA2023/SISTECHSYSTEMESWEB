'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


export default function Home() {
  const router = useRouter();
  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <Image
        src="/banner_accueil.png"
        alt="Sistech Systèmes - solutions numériques"
        width={1000}
        height={600}
        layout="responsive"
        objectFit="contain"
        priority
      />
    </div>
  );
}
