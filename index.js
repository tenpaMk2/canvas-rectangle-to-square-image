// ~~~config~~~
const triangleBlurRadius = 50;
const maxImageEdgeLengthPx = 1080;

// ~~~functions~~~
const processImage = async (img) => {
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

  const squareCanvas = document.querySelector("#squareCanvas");
  const squareCtx = squareCanvas.getContext("2d");

  // ~~~make original square image~~~
  squareCanvas.width = targetShortSideLength;
  squareCanvas.height = targetShortSideLength;

  squareCtx.drawImage(
    img,
    0,
    Math.ceil((imgLongSideLength - imgShortSideLength) / 2),
    imgShortSideLength,
    imgShortSideLength,
    0,
    0,
    squareCanvas.width,
    squareCanvas.height
  );

  // TODO: use resize image quality after iOS will support it.

  // ~~~start gflx.js~~~
  const blurredCanvas = fx.canvas();
  const texture = blurredCanvas.texture(squareCanvas);
  blurredCanvas.draw(texture).triangleBlur(triangleBlurRadius).update();
  document.querySelector("#blurred-image-section").prepend(blurredCanvas);

  // ~~~arrange output~~~
  const outputCanvas = document.querySelector("#outputCanvas");
  const outputCtx = outputCanvas.getContext("2d");

  outputCanvas.width = targetLongSideLength;
  outputCanvas.height = targetLongSideLength;

  outputCtx.drawImage(
    blurredCanvas,
    0,
    0,
    blurredCanvas.width,
    blurredCanvas.height,
    0,
    0,
    outputCanvas.width,
    outputCanvas.height
  );

  outputCtx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    Math.ceil((targetLongSideLength - targetShortSideLength) / 2),
    0,
    targetShortSideLength,
    targetLongSideLength
  );
};

const readerOnLoad = (event) => {
  const img = new Image();
  img.src = event.target.result;
  img.onload = async (event) => {
    await processImage(img);
  };
};

const onChange = (event) => {
  const file = event.target.files[0];

  if (!file) return;

  const reader = new FileReader();
  reader.onload = readerOnLoad;
  reader.readAsDataURL(file);
};

// ~~~main~~~
// ~~~handle `<input>`~~~
document.querySelector("#input").addEventListener("change", onChange);

// ~~~download button~~~
document.querySelector("#download").onclick = (event) => {
  const canvas = document.querySelector("#outputCanvas");

  const link = document.createElement("a");
  const bitmap = canvas.toDataURL("image/png");
  link.href = bitmap.replace("image/png", "image/octet-stream");
  link.download = `canvas-${new Date().valueOf()}.png`;
  link.click();
};
