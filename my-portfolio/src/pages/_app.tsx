import type { AppProps } from 'next/app';
import ClickSpark from '@/components/ui/click-spark';
import { SmoothCursor } from '@/components/ui/smooth-cursor';
import '@/app/globals.css';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SmoothCursor />
      <ClickSpark sparkColor="#0E1C29" sparkSize={10} sparkRadius={15} sparkCount={8} duration={400}>
        <Component {...pageProps} />
      </ClickSpark>
    </>
  );
}
