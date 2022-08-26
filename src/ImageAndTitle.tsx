import { ReactNode } from "react";

type Props = {
  canvas: ReactNode;
  title: string;
};

const ImageAndTitle = ({ canvas, title }: Props) => {
  return (
    <figure className="flex w-full flex-col items-center">
      {canvas}
      <figcaption className="italic text-slate-400">{title}</figcaption>
    </figure>
  );
};

export default ImageAndTitle;
