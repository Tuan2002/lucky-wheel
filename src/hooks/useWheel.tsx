'use client';
import { useState, useRef, useCallback, RefObject, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { Wheel } from 'spin-wheel';
import { UseWheelReturn, WheelProps } from '../types';
import { spinWheelAsync } from '@/app/server/spinWheel';

export const useWheel = (
  containerRef: RefObject<HTMLDivElement>
): UseWheelReturn => {
  const [names, setNames] = useState<string[]>([
    '500.000 VND',
    '50.000 VND',
    '100.000 VND',
    '50.000 VND',
    '100.000 VND',
    '200.000 VND',
    '50.000 VND',
    '100.000 VND',
    '50.000 VND',
    '100.000 VND',
    '200.000 VND',
    '50.000 VND',
    '100.000 VND',
    '50.000 VND',
    '100.000 VND',
    '200.000 VND',
    '50.000 VND',
    '100.000 VND',
    '50.000 VND',
    '100.000 VND',
    '200.000 VND',
    '50.000 VND',
    '100.000 VND',
    '50.000 VND',
    '200.000 VND',
  ]);
  const [currentWinner, setCurrentWinner] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const wheelRef = useRef<Wheel | null>(null);

  // Initialize wheel
  const initWheel = useCallback(() => {
    if (!containerRef.current || names.length === 0) return;

    // Cleanup previous wheel instance
    if (wheelRef.current) {
      wheelRef.current.remove();
      wheelRef.current = null;
    }

    const items = names.map((name) => ({
      label: name,
      weight: 1,
      labelColor: '#000',
    }));

    const wheelProps: WheelProps = {
      items,
      radius: 1,
      borderColor: '#FFFFFF',
      borderWidth: 4,

      lineColor: '#FFFFFF',
      lineWidth: 1,
      pointerAngle: 90,
      itemLabelColors: ['#333'],
      itemBackgroundColors: [
        '#FF9999',
        '#99FF99',
        '#9999FF',
        '#FFFF99',
        '#FF99FF',
        '#99FFFF',
      ],

      itemLabelFont: 'Helvetica, Arial, sans-serif',
      itemLabelFontSizeMax: 24,
      rotationResistance: 0.95,
      rotationSpeedMax: 300,
      onRest: (event) => {
        setIsSpinning(false);
        setCurrentWinner(names[event.currentIndex]);
      },
    };

    wheelRef.current = new Wheel(containerRef.current, wheelProps);
  }, [names, containerRef]);

  const spin = async () => {
    try {
      setIsSpinning(true);
      setCurrentWinner(null);
      const res = await spinWheelAsync({
        id: '1',
        name: '1',
        userName: '1',
      });
      console.log(res);
      wheelRef.current.spinToItem(res.data, 5000, true, 8, 1);
    } catch (error) {
      console.log(error);
    }
  };

  // Update wheel when names change
  useEffect(() => {
    initWheel();
  }, [initWheel]);

  return {
    names,
    spin,
    isSpinning,
    currentWinner,
  };
};
