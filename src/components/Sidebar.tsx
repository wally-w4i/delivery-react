import { useState, type ReactNode } from "react";
import logo from "../assets/react.svg";

// icons
import { MdMenuOpen } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { IoLogoBuffer } from "react-icons/io";
import { CiSettings, CiLogout } from "react-icons/ci";
import { IoIosPeople } from "react-icons/io";
import { CiDeliveryTruck } from "react-icons/ci";

type View = "Clients" | "Deliveries" | "Setting" | "Log" | "Report";

interface MenuItem {
  icons: ReactNode;
  label: View;
}

const menuItems: MenuItem[] = [
  {
    icons: <IoIosPeople size={30} />,
    label: "Clients",
  },
  {
    icons: <CiDeliveryTruck size={30} />,
    label: "Deliveries",
  },
  {
    icons: <CiSettings size={30} />,
    label: "Setting",
  },
  {
    icons: <IoLogoBuffer size={30} />,
    label: "Log",
  },
  {
    icons: <TbReportSearch size={30} />,
    label: "Report",
  },
];

type SidebarProps = {
  changeView: (view: View) => void;
  onLogout: () => void;
};

export default function Sidebar({ changeView, onLogout }: SidebarProps) {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className={`shadow-md h-screen p-2 flex flex-col duration-500 bg-blue-600 text-white ${
        open ? "w-60" : "w-16"
      }`}
    >
      {/* Header */}
      <div className=" px-3 py-2 h-20 flex justify-between items-center">
        <img
          src={logo}
          alt="Logo"
          className={`${open ? "w-10" : "w-0"} rounded-md`}
        />
        <div>
          <MdMenuOpen
            size={34}
            className={` duration-500 cursor-pointer ${!open && " rotate-180"}`}
            onClick={() => setOpen(!open)}
          />
        </div>
      </div>

      {/* Body */}

      <ul className="flex-1">
        {menuItems.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => changeView(item.label)}
              className="px-3 py-2 my-2 hover:bg-blue-800 rounded-md duration-300 cursor-pointer flex gap-2 items-center relative group"
            >
              <div>{item.icons}</div>
              <p
                className={`${
                  !open && "w-0 translate-x-24"
                } duration-500 overflow-hidden`}
              >
                {item.label}
              </p>
              <p
                className={`${
                  open && "hidden"
                } absolute left-32 shadow-md rounded-md
                 w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16
                `}
              >
                {item.label}
              </p>
            </li>
          );
        })}
      </ul>
      {/* footer */}
      <div className="flex items-center gap-2 px-3 py-2">
        <div>
          <FaUserCircle size={30} onClick={() => setOpen(!open)} />
        </div>
        <div
          className={`leading-5 ${
            !open && "w-0 translate-x-24"
          } duration-500 overflow-hidden`}
        >
          <p>Walter</p>
        </div>
        <div
          className={`${
            !open && "w-0 translate-x-24"
          } duration-500 overflow-hidden`}
        >
          <CiLogout size={30} className="cursor-pointer" onClick={onLogout} />
        </div>
      </div>
    </nav>
  );
}
