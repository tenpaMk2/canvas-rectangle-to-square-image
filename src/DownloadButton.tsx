import { createElement } from "react";

type Props = {
  canvas: HTMLCanvasElement;
};

const DownloadButton = ({ canvas }: Props) => {
  const onClick = () => {
    const link = document.createElement("a");
    const bitmap = canvas.toDataURL("image/png");
    link.href = bitmap.replace("image/png", "image/octet-stream");
    link.download = `canvas-${new Date().valueOf()}.png`;
    link.click();
  };

  return (
    <button
      onClick={onClick}
      className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
    >
      download
    </button>
  );
};

export default DownloadButton;
