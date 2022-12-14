import { useState } from "react";
import ImageAndTitle from "./ImageAndTitle";
import InputImage from "./InputImage";
import SquareCanvas from "./SquareCanvas";
import BlurredCanvas from "./BlurredCanvas";
import OutputCanvas from "./OutputCanvas";
import DownloadButton from "./DownloadButton";

// ~~~config~~~
const App = () => {
  const [img, setImg] = useState<HTMLImageElement | null>(null);

  const [squareCanvas, setSquareCanvas] = useState<HTMLCanvasElement | null>(
    null
  );
  const [targetShortSideLength, setTargetShortSideLength] = useState<number>(0);
  const [targetLongSideLength, setTargetLongSideLength] = useState<number>(0);

  const [blurredCanvas, setBlurredCanvas] = useState<HTMLCanvasElement | null>(
    null
  );

  const [outputCanvas, setOutputCanvas] = useState<HTMLCanvasElement | null>(
    null
  );

  const square = img ? (
    <ImageAndTitle
      canvas={
        <SquareCanvas
          img={img}
          onCanvasUpdate={(
            canvas: HTMLCanvasElement,
            targetShortSideLength: number,
            targetLongSideLength: number
          ) => {
            setSquareCanvas(canvas);
            setTargetShortSideLength(targetShortSideLength);
            setTargetLongSideLength(targetLongSideLength);
          }}
        />
      }
      title={`square`}
    />
  ) : null;

  const blurred = squareCanvas ? (
    <ImageAndTitle
      canvas={
        <BlurredCanvas
          squaredCanvas={squareCanvas}
          onCanvasUpdate={setBlurredCanvas}
          edgeLength={targetShortSideLength}
        />
      }
      title={`blurred`}
    />
  ) : null;

  const output = blurredCanvas ? (
    <ImageAndTitle
      canvas={
        <OutputCanvas
          img={img}
          onCanvasUpdate={setOutputCanvas}
          blurredCanvas={blurredCanvas}
          longSideLength={targetLongSideLength}
          shortSideLength={targetShortSideLength}
        />
      }
      title={`output`}
    />
  ) : null;

  const downloadSection = outputCanvas ? (
    <section className="flex flex-col items-center gap-8">
      <p>???????????????????????????DL?????????????????????</p>
      <DownloadButton canvas={outputCanvas} />
      <p>
        ???????????????????????????????????????????????????Instagram??????????????????????????????????????????
      </p>
    </section>
  ) : null;

  return (
    <div className="container mx-auto p-4">
      <article className="mx-auto flex max-w-xl flex-col items-center gap-8 rounded-xl bg-slate-600 p-8 shadow">
        <h1 className="text-4xl text-white">Instagram?????????????????????</h1>

        <section className="flex flex-col items-center">
          <p>
            ???????????????????????????????????????????????????????????????????????????????????????????????????????????????
            <b>?????????????????????????????????????????????????????????</b>
            ??????1080px??????????????????
          </p>

          <InputImage onImageLoaded={setImg} />
        </section>

        {square}
        {blurred}
        {output}

        {downloadSection}
      </article>
    </div>
  );
};

export default App;
