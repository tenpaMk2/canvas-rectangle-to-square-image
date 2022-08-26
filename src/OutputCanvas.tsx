import { useRef, useEffect } from "react";

type Props = {
  img: HTMLImageElement | null;
  onCanvasUpdate: (canvas: HTMLCanvasElement) => void;
  blurredCanvas: HTMLCanvasElement | null;
  longSideLength: number;
  shortSideLength: number;
};

const OutputCanvas = ({
  img,
  onCanvasUpdate,
  blurredCanvas,
  longSideLength,
  shortSideLength,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!img) return;
    if (!blurredCanvas) return;
    if (longSideLength === 0) return;
    if (shortSideLength === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = longSideLength;
    canvas.height = longSideLength;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      blurredCanvas,
      0,
      0,
      blurredCanvas.width,
      blurredCanvas.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      Math.ceil((longSideLength - shortSideLength) / 2),
      0,
      shortSideLength,
      longSideLength
    );

    onCanvasUpdate(canvas);
  });

  return <canvas ref={canvasRef} className="w-full" />;
};

export default OutputCanvas;
