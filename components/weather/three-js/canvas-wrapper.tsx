import { Canvas, CanvasProps } from '@react-three/fiber';
import { Bvh } from '@react-three/drei';
import { motion as fm } from 'framer-motion';
import { useSceneLoadedStore } from '@/lib/store';
import { useEffect, useRef } from 'react';

export const CanvasWrapper = ({
    children,
    canvasProps = {}
}: {
    children: React.ReactNode;
    canvasProps?: Partial<CanvasProps>;
}) => {
    const { isSceneLoaded } = useSceneLoadedStore();
    const eventSourceRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        eventSourceRef.current = document.getElementById('root');
    }, []);

    return (
        <fm.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isSceneLoaded ? 1 : 0 }}
            transition={{ duration: 0.6, ease: [0.26, 0.05, 0.25, 1] }}
            className="pointer-events-none fixed inset-0 z-[10] h-full w-full overflow-hidden bg-transparent">
            <Canvas
                {...canvasProps}
                eventSource={eventSourceRef.current || undefined}
                eventPrefix="client">
                <Bvh firstHitOnly>{children}</Bvh>
            </Canvas>
        </fm.div>
    );
};