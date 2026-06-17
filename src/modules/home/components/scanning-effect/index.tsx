'use client';

import { useContext } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { WebGPUCanvas } from './canvas';
import { PostProcessing } from './post-processing';
import { Scene } from './scene';
import { ContextProvider, GlobalContext } from './context';

const Html = () => {
  const { isLoading } = useContext(GlobalContext);

  useGSAP(() => {
    if (!isLoading) {
      gsap
        .timeline()
        .to('[data-loader]', {
          opacity: 0,
        })
        .from('[data-title]', {
          yPercent: -100,
          stagger: {
            each: 0.15,
          },
          ease: 'power1.out',
        })
        .from('[data-desc]', {
          opacity: 0,
          yPercent: 100,
        });
    }
  }, [isLoading]);

  return (
    <div>
      <div
        className="h-svh  fixed z-90 bg-yellow-900 pointer-events-none w-full flex justify-center items-center"
        data-loader
      >
        <div className="w-6 h-6 bg-white animate-ping rounded-full"></div>
      </div>
      <div className="h-svh">
        <div className="h-svh uppercase items-center w-full absolute z-60 pointer-events-none px-10 flex justify-center flex-col">
          <div
            className="text-4xl md:text-7xl xl:text-8xl 2xl:text-9xl"
          >
            <div className="flex space-x-2 lg:space-x-6 overflow-hidden">
              {'Crown of Fire'.split(' ').map((word, index) => {
                return (
                  <div data-title key={index}>
                    {word}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-xs md:text-xl xl:text-2xl 2xl:text-3xl mt-2 overflow-hidden">
            <div data-desc>The Majesty and Glory of the Young King</div>
          </div>
        </div>

        <WebGPUCanvas>
          <PostProcessing></PostProcessing>
          <Scene></Scene>
        </WebGPUCanvas>
      </div>
    </div>
  );
};

export default function ScanningEffect() {
  return (
    <ContextProvider>
      <Html></Html>
    </ContextProvider>
  );
}
