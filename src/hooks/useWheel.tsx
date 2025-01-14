import { useEffect, useMemo, useRef, useState } from "react";
// @ts-ignore
import { Wheel, WheelProps } from "spin-wheel";

interface UseWheelResult {
    wheel: Wheel | null;
    wheelComponent: JSX.Element;
}

export function useWheel({
    initialProps: _initialProps,
}: {
    initialProps: WheelProps;
}): UseWheelResult {
    const wheelRef = useRef(null);

    const [wheel, setWheel] = useState<Wheel | null>(null);
    const [initialProps] = useState(_initialProps);

    useEffect(() => {
        if (!wheelRef || wheel) return;
        setWheel(new Wheel(wheelRef.current as any, initialProps));
    }, [initialProps, wheelRef, wheel]);

    const wheelComponent = useMemo(() => {
        return (
            <div
          ref= { wheelRef }
        style = {{
            width: "100%",
                height: "100%",
          }
    }
        />
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

return {
    wheel,
    wheelComponent,
};
}