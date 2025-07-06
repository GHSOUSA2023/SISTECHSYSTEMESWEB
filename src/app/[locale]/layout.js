export const dynamic = 'force-dynamic';

export default function LocaleLayout(props) {
  const locale = props?.params?.locale || 'fr';

  return (
    <html lang={locale}>
      <body>
        {props.children}
      </body>
    </html>
  );
}
