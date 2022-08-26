type Props = {
  onImageLoaded: (img: HTMLImageElement) => void;
};

const InputImage = ({ onImageLoaded }: Props) => {
  const readerOnLoad = (event: ProgressEvent<FileReader>) => {
    if (!event.target?.result) {
      return;
    }

    const img = new Image();
    img.src = event.target.result as string;
    img.onload = async (event: Event) => {
      onImageLoaded(img);
    };
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target?.files) {
      return;
    }

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = readerOnLoad;
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <label
        className="mb-2 block text-sm font-medium text-gray-900 dark:text-gray-300"
        htmlFor="input"
      ></label>
      <input
        className="block w-full cursor-pointer border border-gray-600 bg-gray-700 text-sm text-gray-400 placeholder-gray-400 focus:outline-none"
        id="input"
        type="file"
        accept="image/png, image/jpeg, image/webp"
        onChange={onChange}
      />
    </div>
  );
};

export default InputImage;
