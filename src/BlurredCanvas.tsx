import { useRef, useEffect } from "react";
import fx from "./glfx";

const triangleBlurRadius = 50; // TODO: make variable by props

type Props = {
  squaredCanvas: HTMLCanvasElement | null;
  onCanvasUpdate: (canvas: HTMLCanvasElement) => void;
  edgeLength: number;
};

const BlurredCanvas = ({
  squaredCanvas,
  onCanvasUpdate,
  edgeLength,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!squaredCanvas) return;
    if (edgeLength === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = edgeLength;
    canvas.height = edgeLength;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // ~~~start gflx.js~~~
    const fxCanvas: any = fx.canvas();
    const texture = fxCanvas.texture(squaredCanvas);
    fxCanvas.draw(texture).triangleBlur(triangleBlurRadius).update();

    // draw on canvas from blurred canvas data.
    ctx.drawImage(fxCanvas, 0, 0);

    onCanvasUpdate(canvas);
  });

  return <canvas ref={canvasRef} className="w-full" />;
};

export default BlurredCanvas;
