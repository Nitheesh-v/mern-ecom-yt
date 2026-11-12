import React from "react";
import { Fragment } from "react";
import { LibraryBig } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import { ChartNoAxesColumn } from 'lucide-react';
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { ShoppingViewHeaderMenuItems } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser } from "../../store/authThunk/asyncThunk";

export const Header = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user, "header USER");
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(LogoutUser());
  };

  function menuItems() {
    return (
      <nav className="flex lg:flex-row flex-col gap-4">
        {ShoppingViewHeaderMenuItems.map((item) => (
          <Link
            to={item.path}
            key={item.id}
            className="text-sm font-medium hover:text-blue-500"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b shadow-lg bg-white">
      {/* MAIN FLEX */}
      <div className="flex items-center justify-between px-5 py-3">
        {/* LEFT → LOGO */}
        <Link to="/shop/home" className="flex items-center gap-3">
          <LibraryBig className="w-6 h-6" />
          <h1 className="font-bold">Ecommerce</h1>
        </Link>

        {/* RIGHT → MENU (LG ONLY) */}
        <div className="hidden lg:flex">{menuItems()}</div>

        <div className="hidden lg:block">
          <div className="flex items-center gap-4">
            <ShoppingCart />

            <DropdownMenu>
              {/* CLICK AREA */}
              <DropdownMenuTrigger asChild>
                <div className="bg-gray-500   h-9 w-9 rounded-full flex  duration-1000 items-center justify-center text-white font-bold cursor-pointer">
                  {user?.username?.charAt(0).toUpperCase()}
                </div>
              </DropdownMenuTrigger>

              {/* DROPDOWN CONTENT */}
              <DropdownMenuContent align="end" className="w-40 transition-all  hover:scale-110 duration-1000">
                <DropdownMenuItem>Profile</DropdownMenuItem>

                <DropdownMenuItem>Orders</DropdownMenuItem>

                <DropdownMenuItem
                  // onClick={() => dispatch(LogoutUser())}
                  onClick={handleLogout}
                  className="text-red-500"
                >
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button>
                <ChartNoAxesColumn className="w-6 h-6" /> 
              </button>
            </SheetTrigger>

            <SheetContent side="left" className="p-9">
              {menuItems()}
              <div className="flex items-center gap-4">
                <ShoppingCart />
                <h1 className="bg-gray-500 h-9 w-9 rounded-full flex items-center justify-center  text-white font-bold">
                  {user?.username?.charAt(0).toUpperCase()}
                </h1>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
