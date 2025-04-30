import { cn } from "../../lib/utils";
import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo, // Added
} from "react";
import { debounce } from "lodash"; // Or use the custom debounce above
 
interface StarProps {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  twinkleSpeed: number | null;
}
 
interface StarBackgroundProps {
  starDensity?: number;
  allStarsTwinkle?: boolean;
  twinkleProbability?: number;
  minTwinkleSpeed?: number;
  maxTwinkleSpeed?: number;
  className?: string;
}
 
export const StarsBackground: React.FC<StarBackgroundProps> = ({
  starDensity = 0.00015,
  allStarsTwinkle = true,
  twinkleProbability = 0.7,
  minTwinkleSpeed = 0.5,
  maxTwinkleSpeed = 1,
  className,
}) => {
  const [stars, setStars] = useState<StarProps[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { twinklingStars, staticStars } = useMemo(() => ({
    twinklingStars: stars.filter(star => star.twinkleSpeed !== null),
    staticStars: stars.filter(star => star.twinkleSpeed === null),
  }), [stars]);

  const generateStars = useCallback((width: number, height: number) => {
    const area = width * height;
    const numStars = Math.floor(area * starDensity);
    return Array.from({ length: numStars }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 0.05 + 0.5,
      opacity: Math.random() * 0.5 + 0.5,
      twinkleSpeed: allStarsTwinkle || Math.random() < twinkleProbability 
        ? minTwinkleSpeed + Math.random() * (maxTwinkleSpeed - minTwinkleSpeed)
        : null,
    }));
  }, [starDensity, allStarsTwinkle, twinkleProbability, minTwinkleSpeed, maxTwinkleSpeed]);

  useEffect(() => {
    const updateStars = () => {
      if (!canvasRef.current) return;
      const { width, height } = canvasRef.current.getBoundingClientRect();
      canvasRef.current.width = width;
      canvasRef.current.height = height;
      setStars(generateStars(width, height));
    };

    const debouncedUpdateStars = debounce(updateStars, 100);
    const resizeObserver = new ResizeObserver(debouncedUpdateStars);
    if (canvasRef.current) resizeObserver.observe(canvasRef.current);
    return () => resizeObserver.disconnect();
  }, [generateStars]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Batch static stars
      ctx.beginPath();
      staticStars.forEach(star => {
        ctx.moveTo(star.x + star.radius, star.y);
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      });
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fill();

      // Animate twinkling stars
      twinklingStars.forEach(star => {
        star.opacity = 0.5 + Math.abs(Math.sin(Date.now() * 0.001 / star.twinkleSpeed!) * 0.5);
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, [twinklingStars, staticStars]);

  return <canvas ref={canvasRef} className={cn("h-full w-full absolute inset-0", className)} />;
};