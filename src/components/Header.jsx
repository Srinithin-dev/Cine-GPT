import { Clapperboard, Search, ChevronDown } from "lucide-react";
import { useDispatch } from "react-redux";
import Auth from "./Auth";
import { useEffect, useState } from "react";
import { auth, onAuthStateChanged } from "../utils/firebase";
import { addUser, removeUser } from "../store/userSlice";
import { useNavigate } from "react-router";
import useAuthorization from "../hooks/useAuthorization";

const Header = ({ user, onSignOut }) => {
  useAuthorization();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initial = (user?.displayName || user?.email || "U")
    .charAt(0)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0A0A0F]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-6">
        <div className="flex shrink-0 items-center gap-2.5">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500">
            <Clapperboard size={16} className="text-white" />
          </div>
          <span className="text-[15px] font-semibold tracking-tight text-zinc-100">
            CineGPT
          </span>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {["Discover", "My List", "Collections"].map((item, i) => (
            <a
              key={item}
              href="#"
              className={[
                "rounded-md px-3 py-1.5 text-[13.5px] transition",
                i === 0
                  ? "bg-white/[0.06] text-zinc-100"
                  : "text-zinc-400 hover:text-zinc-100",
              ].join(" ")}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex-1" />

        <button
          type="button"
          className="hidden items-center gap-2 rounded-lg bg-white/[0.04] px-3 py-1.5 text-[13px] text-zinc-500 ring-1 ring-white/[0.07] transition hover:bg-white/[0.07] sm:flex"
        >
          <Search size={14} />
          <span>Search</span>
          <kbd className="ml-6 rounded border border-white/10 px-1.5 py-0.5 text-[10px] text-zinc-500">
            ⌘K
          </kbd>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="grid h-8 w-8 overflow-hidden place-items-center rounded-full bg-gradient-to-br from-indigo-500/80 to-purple-500/80 text-[13px] font-semibold text-white">
                <img
                  src={user?.photoURL}
                  alt={user?.displayName || "User profile"}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>{user?.displayName}</div>

              <ChevronDown
                size={14}
                className="hidden text-zinc-500 sm:block"
              />
            </div>
          </div>

          {onSignOut && (
            <button
              type="button"
              onClick={onSignOut}
              className="rounded-lg px-3 py-1.5 text-[13px] text-zinc-400 ring-1 ring-white/[0.07] transition hover:bg-white/[0.05] hover:text-zinc-100"
            >
              Sign out
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
