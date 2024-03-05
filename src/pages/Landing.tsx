import Logo from "@/components/Logo";
import {pb} from "@/utils/pocketbase";
import {motion, useMotionTemplate, useMotionValue} from "framer-motion";
import {AlignRightIcon, ChevronRight, XIcon} from "lucide-react";
import {useState} from "react";
import {Link} from "react-router-dom";

const Landing = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // eslint-disable-next-line
  const handleMouseMove = ({clientX, clientY}: any) => {
    mouseX.set(clientX);
    mouseY.set(clientY);
  };

  return (
    <>
      <main onMouseMove={handleMouseMove} className="landing hero">
        <motion.div
          className="absolute inset-0 top-0 left-0 pointer-events-none"
          style={{
            background: useMotionTemplate`radial-gradient(800px circle at ${mouseX}px ${mouseY}px,rgb(152 42 226 / 0.1), rgb(92 49 190 / 0.1) 30%,transparent 80%)`,
          }}
        />
        <section className="w-full max-w-screen-xl px-8 py-2 mx-auto">
          <Nav />
          <div className="flex flex-col items-center h-[60dvh] justify-center sm:justify-start sm:flex-row">
            <div className="flex flex-col items-center shadow-outline p22 sm:items-start">
              <h1 className="text-transparent text-[40px] sm:text-[4rem] bg-gradient-to-br from-fuchsia-300 to-purple-500 bg-clip-text">
                Deploy React
              </h1>
              <h2 className="text-2xl sm:-mt-2 sm:text-[30px]">in a single click!</h2>
              <p className="max-w-[90%] sm:mt-6 text-sm mt-8 text-center sm:text-start text-light/70 inter">
                One-click deployment for your React projects.
                <br />
                Effortless, instant, and hassle-free. Get your projects live{" "}
                <span className="text-white underline decoration-accent_1">in seconds!</span>
              </p>

              <a
                href="/"
                className="w-max mt-12 inter px-6 font-[600] py-3 text-sm border rounded-md group shadow-lg border-white/30 sm:block bg-gradient-to-br from-accent_1 to-accent_2"
              >
                <div className="flex flex-row items-center justify-center gap-2 transition-all ease-in-out hover:gap-5">
                  <span>Launch an App For Free</span>
                  <ChevronRight className="w-5 text-light/60 group-hover:text-light" />
                </div>
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <nav className="flex items-baseline justify-between w-full py-6">
        <div className="flex items-baseline justify-start">
          <Logo className={"w-16 -ml-3"} />
          <span className="pl-8 pr-2 text-xl font-bold rounded-full -ml-11 p22">abbit</span>
        </div>
        <div className="flex-row hidden gap-6 sm:flex text-sm font-[500]">
          <a className="transition-all ease-in-out hover:text-accent_1" href="#">
            Articles
          </a>
          <a className="transition-all ease-in-out hover:text-accent_1" href="#">
            Docs
          </a>
          <a className="transition-all ease-in-out hover:text-accent_1" href="#">
            Pricing
          </a>
        </div>

        <Link
          draggable={false}
          to={pb.authStore.isValid ? "/dashboard" : "/login"}
          className="hidden px-8 font-[500] py-2 text-sm border rounded-md shadow-lg border-white/30 sm:block  ease-in-out duration-300 bg-gradient-to-br from-transparent to-transparent hover:from-accent_1 hover:to-accent_2"
        >
          {pb.authStore.isValid ? "Dashboard" : "Login"}
        </Link>
        <button className="sm:hidden" onClick={() => setShowMenu(!showMenu)}>
          <AlignRightIcon className="w-10 transition-all ease-in-out duration-100 h-auto p-1 border-[2px] border-transparent rounded-lg aspect-square hover:border-white" />
        </button>
      </nav>
      {showMenu && <Menu setShowMenu={setShowMenu} />}
    </>
  );
};

const Menu = ({setShowMenu}: {setShowMenu: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <>
      <div className="fixed z-[99999] top-0 left-0 w-screen h-[100dvh] backdrop-blur-sm bg-dark/90">
        <button onClick={() => setShowMenu(false)}>
          <XIcon className="w-10 absolute top-14 right-8 transition-all ease-in-out duration-100 h-auto p-1 border-[2px] border-transparent rounded-lg aspect-square sm:hidden hover:border-white" />
        </button>
        <div className="flex flex-col items-center h-[100dvh] w-screen justify-evenly">
          <div className="flex-col justify-center items-center flex gap-6 text-sm font-[500]">
            <a className="transition-all ease-in-out hover:text-accent_1" href="#">
              Articles
            </a>
            <a className="transition-all ease-in-out hover:text-accent_1" href="#">
              Docs
            </a>
            <a className="transition-all ease-in-out hover:text-accent_1" href="#">
              Pricing
            </a>
          </div>

          <Link
            to={pb.authStore.isValid ? "/dashboard" : "/login"}
            draggable={false}
            className="px-8 font-[500] py-2 text-sm border rounded-md shadow-lg  bg-gradient-to-br border-white/30 from-accent_1 to-accent_2"
          >
            {pb.authStore.isValid ? "Dashboard" : "Login"}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Landing;
