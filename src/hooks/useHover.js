import {useRef, useState, useEffect} from 'react';

export default function useHover() {
    const [value, setValue] = useState(false);

    const ref = useRef(null);

    useEffect(() => {
        const handleMouseEnter = () => setValue(true);
        const handleMouseLeave = () => setValue(false);
        const element = ref && ref.current;

        const isSupported = element && element.addEventListener;
        if (!isSupported) {
            return () => {};
        }

        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mouseenter', handleMouseEnter);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [ref]);

    return [ref, value];
}
