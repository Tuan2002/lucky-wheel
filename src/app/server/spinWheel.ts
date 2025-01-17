"use server";

import { GameRewards } from "@/constants/gameRewards";
import { TimeConstants } from "@/constants/timeConstants";
import { prisma } from "@/libs/prisma";
import { ActionResponse, SpinResult, User } from "@/types";
import { StatusCodes } from "http-status-codes";

const spinWheelAsync = async (spine: User) : Promise<ActionResponse> => {
    try {
        const isSpined = await prisma.spinHistory.findFirst({
            where: {
                userId: spine.id
            }
        });
        // if (isSpined) {
        //     return {
        //         statusCodes: StatusCodes.BAD_REQUEST,
        //         message: "You have already spinned the wheel"
        //     }
        // }
        const spinInterval = TimeConstants.SPIN_INTERVAL;
        const totalSteps = (TimeConstants.SPIN_TIME * 1000) / (spinInterval * (Math.random() + 1));
        let step = 1;
        let spinIndex = 0;
        const spinPromise = new Promise<SpinResult>((resolve) => {
            const spinLoop = setInterval(() => {
                spinIndex = (spinIndex + 1) % GameRewards.length;
                console.log(`Spinning... Current index: ${spinIndex}`);
                step++;
                if (step >= totalSteps) {
                    clearInterval(spinLoop);
                    const selectedReward = GameRewards[spinIndex];
                    const promiseSpinResult = { reward: selectedReward, index: spinIndex };
                    resolve(promiseSpinResult); // Resolve within the setInterval after completion
                }
            }, spinInterval);
        });
        const spinResult = await spinPromise;
        console.log(`Spinned result:`,spinResult);
        await prisma.spinHistory.create({
            data: {
                userId: spine.id,
                userName: spine.userName,
                rewardValue: Number(spinResult.reward?.value) || 0,
            }
        });
        return {
            statusCodes: StatusCodes.OK,
            message: "You have successfully spinned the wheel",
            data: spinResult
        }
    }
    catch (error) {
        console.error(error);
        return {
            statusCodes: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "An error occurred while spinning the wheel"
        }
    }
};

const getSpinHistoryAsync = async (userId: string): Promise<ActionResponse> => {
    try {
        const spinHistories = await prisma.spinHistory.findMany({
            where: {
                userId: userId
            }
        });
        return {
            statusCodes: StatusCodes.OK,
            message: "Successfully get spin history",
            data: spinHistories
        }
    }
    catch (error) {
        return {
            statusCodes: StatusCodes.INTERNAL_SERVER_ERROR,
            message: "An error occurred while getting spin history"
        }
    }
}
export {
    getSpinHistoryAsync, spinWheelAsync
};

