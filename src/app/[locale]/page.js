'use client';
import {useTranslations} from 'next-intl';
import { useRouter } from 'next/navigation';

export default function Home() {
  const t = useTranslations();
  const router = useRouter();

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-20">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
        {t('welcome')}
      </h1>
      <p className="text-lg text-gray-600 mb-12 text-center max-w-xl">
        {t('subtitle')}
      </p>

      <div className="grid gap-8 grid-cols-1 md:grid-cols-3 w-full max-w-4xl">
        <div
          onClick={() => router.push('/packages')}
          className="cursor-pointer bg-gray-100 hover:bg-gray-200 p-8 rounded-xl shadow-md transition"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{t('packages')}</h2>
          <p className="text-gray-600">Suivi et gestion des colis reçus à la réception.</p>
        </div>

        <div
          onClick={() => router.push('/aptemails')}
          className="cursor-pointer bg-gray-100 hover:bg-gray-200 p-8 rounded-xl shadow-md transition"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{t('aptEmails')}</h2>
          <p className="text-gray-600">Liste des appartements et adresses courriel associées.</p>
        </div>

        <div
          onClick={() => router.push('/incidents')}
          className="cursor-pointer bg-gray-100 hover:bg-gray-200 p-8 rounded-xl shadow-md transition"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{t('incidents')}</h2>
          <p className="text-gray-600">Enregistrez et suivez les incidents liés aux contrats ou colis.</p>
        </div>
      </div>
    </main>
  );
}
