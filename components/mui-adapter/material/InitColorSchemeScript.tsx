import Script from 'next/script';

const script = `(() => {
  try {
    const saved = localStorage.getItem('color-mode');
    const dark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch {}
})();`;

export default function InitColorSchemeScript(_props: { attribute?: string }) {
  return <Script id="init-color-mode" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: script }} />;
}
