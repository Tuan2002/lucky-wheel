import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

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