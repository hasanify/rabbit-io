import {FC, useEffect, useState} from "react";

interface UrlScreenshotProps {
  url: string;
}

const LinkPreview: FC<UrlScreenshotProps> = ({url}) => {
  const [preview, setPreview] = useState<string | null>();

  useEffect(() => {
    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.style.display = "none";
    document.body.appendChild(iframe);

    iframe.onload = () => {
      const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
      if (iframeDocument) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (context) {
          canvas.width = iframeDocument.documentElement.scrollWidth;
          canvas.height = iframeDocument.documentElement.scrollHeight;
          //@ts-expect-error asdad
          context.drawImage(iframeDocument.documentElement, 0, 0);
          const base64Image = canvas.toDataURL("image/png");
          setPreview(base64Image);
        }
      }
      document.body.removeChild(iframe);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <>
      {preview ? (
        <img src={preview} alt="Website Screenshot" className="w-64 h-auto aspect-video" />
      ) : (
        <>
          <div className="w-64 h-auto bg-gray-300 aspect-video animate-pulse" />
        </>
      )}
    </>
  );
};

export default LinkPreview;
