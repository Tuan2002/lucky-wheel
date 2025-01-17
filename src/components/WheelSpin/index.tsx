"use client"
import { spinWheelAsync } from "@/app/server/spinWheel";
import { useWheel } from "@/hooks/useWheel";
import { FC } from "react";
// @ts-ignore
import { Wheel } from "spin-wheel";
import { v4 as uuid } from "uuid";

const randomizeNumber = (number: number) => Math.floor(Math.random() * number);

const wheelItems: Wheel["items"] = [
    {
        label: "tuan.nguyenngocanh",
    },
    {
        label: "quan.nguyenxuan",
    },
    {
        label: "thanh.nguyenquoc",
    },
];

const ElementWheel: FC = () => {
    const { wheel, wheelComponent } = useWheel({
        initialProps: {
            items: wheelItems,
            radius: 0.89,
            pointerAngle: 90,
            itemLabelRadius: 0.92,
            itemLabelRadiusMax: 0.37,
            itemLabelRotation: 0,
            itemLabelAlign: "right",
            itemLabelColors: ['#000'],
            itemLabelBaselineOffset: -0.06,
            itemBackgroundColors: ['#fbf8c4', '#e4f1aa', '#c0d26e', '#ff7d7d'],
            rotationSpeedMax: 700,
            rotationResistance: -110,
            lineWidth: 0,
            borderWidth: 0,
        },
    });

    return (
        <div className="h-full w-full">
            <div className="w-full h-full">
                <button
                    className="absolute top-0 left-0 z-10"
                    onClick={ async () => {
                        const res = await spinWheelAsync(
                            {
                                id: uuid(),
                                name: "Tuan Nguyen Ngoc Anh",
                                userName: "tuan.nguyenngocanh",
                            }
                        );
                        console.log(res);
                    
                    }}
                >
                    Spin!
                </button>
            </div>
            <div className="w-full h-full absolute top-0 left-0">
                {wheelComponent}
            </div>
        </div>
    );
};

export default ElementWheel;