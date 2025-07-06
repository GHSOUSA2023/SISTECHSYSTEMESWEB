import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function LocaleLayout(props) {
  const locale = props?.params?.locale;

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {props.children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
