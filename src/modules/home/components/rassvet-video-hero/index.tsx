'use client';

import { useContext } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { WebGPUCanvas } from '@modules/home/components/scanning-effect/canvas';
import { PostProcessing } from '@modules/home/components/scanning-effect/post-processing';
import { Scene } from '@modules/home/components/scanning-effect/scene';
import {
  ContextProvider,
  GlobalContext,
} from '@modules/home/components/scanning-effect/context';

const HeroContent = () => {
  const { isLoading } = useContext(GlobalContext);

  useGSAP(() => {
    if (!isLoading) {
      gsap
        .timeline()
        .to('[data-scan-loader]', {
          opacity: 0,
        })
        .from('[data-scan-title]', {
          yPercent: -100,
          stagger: {
            each: 0.15,
          },
          ease: 'power1.out',
        })
        .from('[data-scan-desc]', {
          opacity: 0,
          yPercent: 100,
        })
        .from('[data-scan-actions]', {
          opacity: 0,
          y: 24,
          ease: 'power1.out',
        });
    }
  }, [isLoading]);

  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-[90] flex h-svh w-full items-center justify-center bg-[#0d0e0d]"
        data-scan-loader
      >
        <div className="h-6 w-6 animate-ping rounded-full bg-[var(--color-accent)]" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[55]"
        style={{
          background:
            'linear-gradient(180deg, rgba(13,14,13,0.45) 0%, rgba(18,19,18,0.2) 40%, rgba(11,12,11,0.85) 100%)',
        }}
      />

      <div className="content-container pointer-events-none absolute inset-0 z-[60] flex h-svh flex-col justify-end pb-20 small:pb-28">
        <div className="pointer-events-auto max-w-3xl">
          <span className="eyebrow" data-scan-title>
            Limited tactical wear
          </span>
          <h1
            className="heading-display mt-5 overflow-hidden text-[clamp(3rem,11vw,9rem)] leading-[0.9] tracking-tight"
            data-scan-title
          >
            РАССВЕТ
          </h1>
          <p
            className="mt-6 max-w-xl overflow-hidden text-base leading-relaxed text-[var(--color-muted)] small:text-lg"
            data-scan-desc
          >
            Тактическая эстетика. Городская форма. Ограниченные коллекции.
          </p>
          <div
            className="mt-9 flex flex-col gap-4 sm:flex-row"
            data-scan-actions
          >
            <LocalizedClientLink href="/store" className="btn-primary">
              Перейти в каталог
            </LocalizedClientLink>
            <LocalizedClientLink href="/store" className="btn-secondary">
              Смотреть коллекции
            </LocalizedClientLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default function RassvetVideoHero() {
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-[var(--color-bg)]">
      <ContextProvider>
        <div className="h-svh">
          <HeroContent />
          <WebGPUCanvas>
            <PostProcessing></PostProcessing>
            <Scene></Scene>
          </WebGPUCanvas>
        </div>
      </ContextProvider>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-[70] h-px"
        style={{ backgroundColor: 'var(--color-border)' }}
      />
    </section>
  );
}
