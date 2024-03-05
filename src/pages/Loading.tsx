import {Loader2Icon} from "lucide-react";

const Loading = () => {
  return (
    <main className="w-screen absolute top-0 left-0 z-[999999999] h-[100dvh] bg-dark flex flex-col justify-center items-center">
      <Loader2Icon className="w-8 h-8 text-white animate-spin" />
    </main>
  );
};

export default Loading;
