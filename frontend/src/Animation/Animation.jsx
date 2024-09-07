import { useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const useAnimation = (color) => {
    const [isHovered, setIsHovered] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.4, 0.4], ['12.5deg', '-12.5deg']);
    const rotateY = useTransform(mouseXSpring, [-0.4, 0.4], ['12.5deg', '-12.5deg']);

    // Create dynamic box shadow based on rotation
    const boxShadow = useTransform(
        [rotateX, rotateY],
        ([xDeg, yDeg]) => {
            const xOffset = parseFloat(xDeg);
            const yOffset = parseFloat(yDeg);
            const blurRadius = 0;

            // Adjust shadow values to simulate border change
            const shadowX = yOffset > 0 ? '-1px' : '1px';
            const shadowY = xOffset > 0 ? '-1px' : '1px';
            const shadowColor = isHovered ? `${color}`:"#101010";

            return `${shadowX} ${shadowY} ${blurRadius}px ${shadowColor}`;
            
        }
    );

    const handleMouseMove = (e) => {
        const rect = e.target.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };
    return {
        motion, handleMouseMove, handleMouseLeave, boxShadow, isHovered, setIsHovered, rotateX,
        rotateY,
    }
}

export default useAnimation
