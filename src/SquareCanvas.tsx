import { useRef, useEffect } from "react";

const maxImageEdgeLengthPx = 1080; // TODO: make variable by props

type Props = {
  img: HTMLImageElement | null;
  onCanvasUpdate: (
    canvas: HTMLCanvasElement,
    targetShortSideLength: number,
    targetLongSideLength: number
  ) => void;
};

const SquareCanvas = ({ img, onCanvasUpdate }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!img) return;

    const imgLongSideLength = img.width < img.height ? img.height : img.width;
    const imgShortSideLength = img.width < img.height ? img.width : img.height;

    const targetLongSideLength =
      maxImageEdgeLengthPx < imgLongSideLength
        ? maxImageEdgeLengthPx
        : imgLongSideLength;
    const targetShortSideLength =
      maxImageEdgeLengthPx < imgLongSideLength
        ? Math.ceil(
            imgShortSideLength * (maxImageEdgeLengthPx / imgLongSideLength)
          )
        : imgShortSideLength;

    canvas.width = targetShortSideLength;
    canvas.height = targetShortSideLength;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.drawImage(
      img,
      0,
      Math.ceil((imgLongSideLength - imgShortSideLength) / 2),
      imgShortSideLength,
      imgShortSideLength,
      0,
      0,
      canvas.width,
      canvas.height
    );

    // TODO: use resize image quality after iOS will support it.

    onCanvasUpdate(canvas, targetShortSideLength, targetLongSideLength);
  });

  return <canvas ref={canvasRef} className="w-full" />;
};

export default SquareCanvas;
