import Logo from "@/components/Logo";
import {logout} from "@/utils/pocketbase";
import {AlignRightIcon, XIcon} from "lucide-react";
import {useState} from "react";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div className="w-full py-6 mx-auto shadow-lg bg-gradient-to-br from-accent_1/50 to-accent_2/50">
        <nav className="flex items-baseline justify-between max-w-screen-xl px-8 mx-auto">
          <div className="flex items-baseline justify-start">
            <Logo className={"w-12 -ml-3"} />
            <span className="pl-8 pr-2 text-xl font-bold rounded-full text-light -ml-11 p22">
              abbit
            </span>
          </div>

          <button
            onClick={() => logout()}
            className="hidden px-8 font-[500] py-2 text-dark text-sm border rounded-md shadow-lg border-white/30 sm:block  ease-in-out duration-300 hover:bg-gradient-to-br hover:text-light bg-light hover:from-accent_1 hover:to-accent_2"
          >
            Logout
          </button>
          <button className="sm:hidden" onClick={() => setShowMenu(!showMenu)}>
            <AlignRightIcon className="w-10 transition-all text-light ease-in-out duration-100 h-auto p-1 border-[2px] border-transparent rounded-lg aspect-square hover:border-white" />
          </button>
        </nav>
      </div>
      {showMenu && <Menu setShowMenu={setShowMenu} />}
    </>
  );
};

const Menu = ({setShowMenu}: {setShowMenu: React.Dispatch<React.SetStateAction<boolean>>}) => {
  return (
    <>
      <div className="fixed text-light z-[99999] top-0 left-0 w-screen h-[100dvh] backdrop-blur-sm bg-dark/90">
        <button onClick={() => setShowMenu(false)}>
          <XIcon className="w-10 text-light  absolute top-14 right-8 transition-all ease-in-out duration-100 h-auto p-1 border-[2px] border-transparent rounded-lg aspect-square sm:hidden hover:border-white" />
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

          <button
            draggable={false}
            onClick={() => logout()}
            className="px-8 font-[500] py-2 text-sm border rounded-md shadow-lg  bg-gradient-to-br border-white/30 from-accent_1 to-accent_2"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
