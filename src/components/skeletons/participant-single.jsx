import React from "react";
import { Skeleton } from "@nextui-org/react";

export default function ParticipantSkeleton({ loading }) {

    return (
        <>
            <Skeleton isLoaded={loading} className="w-2/5 rounded-lg text-center">
                <p className="h-3 w-500 rounded-lg bg-secondary text-center"></p>
            </Skeleton>
            <div className="max-w-[300px] w-full flex items-center gap-3">
                <Skeleton isLoaded={loading} className="rounded-lg">
                    <div className="h-30 rounded-lg bg-secondary"></div>
                </Skeleton>
                <div className="space-y-3 mt-5">
                    <Skeleton isLoaded={loading} className="w-2/5 rounded-lg">
                        <div className="h-6 w-full rounded-lg bg-secondary"></div>
                    </Skeleton>
                    <Skeleton isLoaded={loading} className="w-2/5 rounded-lg">
                        <div className="h-6 w-full rounded-lg bg-secondary-300"></div>
                    </Skeleton>
                    <Skeleton isLoaded={loading} className="w-2/5 rounded-lg">
                        <div className="h-6 w-full rounded-lg bg-secondary-200"></div>
                    </Skeleton>
                    <Skeleton isLoaded={loading} className="w-2/5 rounded-lg">
                        <div className="h-6 w-full rounded-lg bg-secondary-300"></div>
                    </Skeleton>
                    <Skeleton isLoaded={loading} className="w-2/5 rounded-lg">
                        <div className="h-6 w-full rounded-lg bg-secondary-200"></div>
                    </Skeleton>
                </div>
            </div>
        </>
    );
}
