import { Suspense } from 'react';
import { CanvasWrapper } from './three-js/canvas-wrapper';
import { CameraStuff } from './three-js/camer-stuff';
import { Loader } from './three-js/loader';
import { Bath } from './three-js/bath';
import { Lights } from './three-js/lights';
import { Spinner } from './three-js/spinner';

const Scene = () => {
    return (
        <>
            <Suspense fallback={null}>
                <Bath />

                <Lights />
                <CameraStuff />

                <Loader />
            </Suspense>
        </>
    );
};

export default function CanvasBackground() {
    return (
        <div className=" fixed inset-0 z-0 pointer-events-auto bg-[#e2dbc9] dark:bg-gray-600/60">
            <div className="h-[100dvh] p-4">
                <div className="relative h-full w-full rounded-[.9rem] bg-[#918a7e] dark:bg-gray-200/10 max-md:pt-1">
                    <h1 className="absolute z-[2] w-[8em] pl-[0.5rem] text-[6.7em] font-normal leading-[0.87] tracking-[-0.05em] text-[#e2dbc9] max-md:text-[4em]">
                        Mood Journal
                    </h1>

                    <CanvasWrapper>
                        <Scene />
                    </CanvasWrapper>
                </div>
            </div>
            <Spinner />
        </div>
    );
}