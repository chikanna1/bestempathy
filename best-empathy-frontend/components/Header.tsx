import Link from "next/link";

import Hamburger from "hamburger-react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const DockComponent = dynamic(() =>
  import("react-dock").then((mod) => mod.Dock)
);

function Header() {
  const [isOpen, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="flex py-3 items-center justify-between px-10 sticky top-0 z-50 bg-white">
      <div>
        <h1 className="text-lg p-5 italic">Cenify Therapy</h1>
      </div>
      {user ? (
        <div className="hidden md:flex space-x-5">
          <Link
            className="text-md text-slate-600 py-2 hover:text-slate-400 transition duration-500 rounded-md text-center"
            href="/match-with-therapists"
          >
            DASHBOARD
          </Link>
          <Link
            className="hidden lg:inline-block text-md text-slate-600 py-2 hover:text-slate-400 transition duration-500 rounded-md text-center "
            href="/mental-health-advice"
          >
            EDIT PROFILE
          </Link>
          <p
            className="hidden lg:inline-block text-md text-slate-600 py-2 hover:text-slate-400 transition duration-500 rounded-md text-center"
            onClick={logout}
          >
            LOGOUT
          </p>
        </div>
      ) : (
        <div className="hidden md:flex space-x-5">
          <Link
            className="text-md text-slate-600 py-2 hover:text-slate-400 transition duration-500 rounded-md text-center"
            href="/match-with-therapists"
          >
            MATCH WITH A THERAPIST
          </Link>
          <Link
            className="hidden lg:inline-block text-md text-slate-600 py-2 hover:text-slate-400 transition duration-500 rounded-md text-center "
            href="/mental-health-advice"
          >
            MENTAL HEALTH ADVICES
          </Link>
          <Link
            className="hidden lg:inline-block text-md text-slate-600 py-2 hover:text-slate-400 transition duration-500 rounded-md text-center"
            href="/guide-to-therapy"
          >
            GUIDE TO THERAPY
          </Link>
          <Link
            className="text-md text-slate-600 py-2 hover:text-slate-400 transition duration-500 rounded-md text-center"
            href="/therapist-sign-in-sign-up"
          >
            ARE YOU A THERAPIST
          </Link>
        </div>
      )}
      <div className="md:hidden">
        <Hamburger toggled={isOpen} toggle={setOpen} />
        <div className="mixed-chart">
          {typeof window !== "undefined" && (
            <DockComponent position="top" isVisible={isOpen} size={1}>
              <div onClick={() => setOpen(false)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-10 h-10 mx-auto mb-10 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              {user ? (
                <div className="flex flex-col">
                  <Link
                    className="text-lg text-slate-600 my-10 hover:text-slate-400 transition duration-500 rounded-md text-center"
                    href="/match-with-therapists"
                  >
                    DASHBOARD
                  </Link>
                  <Link
                    className=" lg:inline-block text-lg text-slate-600 my-10 hover:text-slate-400 transition duration-500 rounded-md text-center "
                    href="/mental-health-advice"
                  >
                    EDIT PROFILE
                  </Link>
                  <Link
                    className=" lg:inline-block text-lg text-slate-600 my-10 hover:text-slate-400 transition duration-500 rounded-md text-center"
                    href="/guide-to-therapy"
                  >
                    LOGOUT
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col">
                  <Link
                    className="text-lg text-slate-600 my-10 hover:text-slate-400 transition duration-500 rounded-md text-center"
                    href="/match-with-therapists"
                  >
                    MATCH WITH A THERAPIST
                  </Link>
                  <Link
                    className=" lg:inline-block text-lg text-slate-600 my-10 hover:text-slate-400 transition duration-500 rounded-md text-center "
                    href="/mental-health-advice"
                  >
                    MENTAL HEALTH ADVICES
                  </Link>
                  <Link
                    className=" lg:inline-block text-lg text-slate-600 my-10 hover:text-slate-400 transition duration-500 rounded-md text-center"
                    href="/guide-to-therapy"
                  >
                    GUIDE TO THERAPY
                  </Link>
                  <Link
                    className="text-lg text-slate-600 my-10 hover:text-slate-400 transition duration-500 rounded-md text-center"
                    href="/therapist-sign-in-sign-up"
                  >
                    ARE YOU A THERAPIST
                  </Link>
                </div>
              )}
            </DockComponent>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
