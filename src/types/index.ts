import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export interface WheelItem {
  label: string;
  weight: number;
  backgroundColor?: string;
  labelColor?: string;
}

export interface WheelProps {
  items: WheelItem[];
  itemLabelColors: string[];
  itemBackgroundColors: string[];
  radius: number;
  borderColor: string;
  borderWidth:number;
  lineColor:string;
  lineWidth: number;
  pointerAngle:number;
  itemLabelFont: string;
  itemLabelFontSizeMax: number;
  rotationResistance: number;
  rotationSpeedMax: number;
  onRest: (event: { currentIndex: number }) => void;
}

export interface UseWheelReturn {
  names: string[];
  spin: () => void;
  isSpinning: boolean;
  currentWinner: string | null;
}

export type User = {
  id: string;
  name: string;
  userName: string;
};

export type ActionResponse = {
  statusCodes: number;
  message?: string;
  data?: any;
};

export type SpinResult = {
  reward: any;
  index: number;
};
