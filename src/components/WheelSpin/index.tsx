'use client';

import { useWheel } from '@/hooks/useWheel';
import { useContext, useEffect, useRef, useState } from 'react';
import DistiquesRouges from '../DistiquesRouges';
import { WinnerModalContext } from '@/context/winner';

export const WheelComponent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const context = useContext(WinnerModalContext);
  if (!context) return null;
  const { openModal } = context;
  const { names, spin, isSpinning, currentWinner } = useWheel(containerRef);
  useEffect(() => {
    if (currentWinner) {
      openModal(currentWinner);
    }
  }, [currentWinner]);
  

  return (
    <div className="w-full h-full flex gap-20 z-1 flex-row ">
      {/* Wheel container */}
      <div className="flex justify-start items-start">
        <DistiquesRouges text="Xuân sang cội phúc sinh nhành lộc" />
      </div>
      <div className="flex-1 justify-center items-center p-14 ">
        <div
          ref={containerRef}
          className="relative aspect-square rounded-full min-w-[500px] max-w-[700px] left-1/2 -translate-x-1/2 -translate-y-1/2 top-1/2 "
        >
          {names.length >= 1 && (
            <div className="absolute top-1/2 -right-9 -translate-x-1/2 -translate-y-1/2">
              <div className="w-0 h-0 border-t-[20px] border-t-transparent border-b-[20px] border-b-transparent border-r-[40px] border-red-500" />
            </div>
          )}
          {names.length >= 1 && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <button
                onClick={spin}
                className={`
                    h-24 w-24
                    disabled:opacity-50 transition-all duration-300 hover:scale-105
                    ${isSpinning ? 'animate-pulse' : ''} 
                    bg-blue-500 rounded-full border-4 border-white 
                    flex flex-col justify-center items-center 
                    disabled:opacity-50 shadow-lg
                  `}
                disabled={isSpinning || names.length < 2}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="h-11 w-11 text-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
                <span className="font-bold text-xl text-white">Spin</span>
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <DistiquesRouges text="Tết về cây đức trổ thêm hoa" />
      </div>
    </div>
  );
};
