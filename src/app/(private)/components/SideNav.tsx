"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, BrainCog, MessageSquare, Image, ShoppingBag, Settings2, LogOut, ChevronsLeft, ChevronsRight, Crown, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import userServices from "@/services/userService";
import handleLogout from "@/lib/authUtils";
import ConfirmationModal from "./ReusableComponents/ConfirmationModel";

const SideNav = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userIdString = localStorage.getItem("userData");
    if (userIdString) {
      const parsedUserId = JSON.parse(userIdString).userId;
      fetchUser(parsedUserId);
    }
  }, []);

  const fetchUser = async (userId: any) => {
    try {
      const userData = await userServices.getUserById(userId);
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleConfirmLogout = () => {
    handleLogout(router);
    handleCloseModal();
  };

  const navItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: ShoppingBag, label: "Order Now", href: "/shop" },
    { icon: BrainCog, label: "Train Your Model", href: "/train" },
    { icon: MessageSquare, label: "Chat", href: "/chat" },
    { icon: Image, label: "Gallery", href: "/gallery" },
  ];

  const sidebarVariants = {
    expanded: { width: "250px" },
    collapsed: { width: "64px" },
  };

  const SidebarContent = () => (
    <motion.div
      className="flex flex-col h-full mx-10 rounded-xl border border-white bg-black text-white"
      variants={sidebarVariants}
      animate={isExpanded ? "expanded" : "collapsed"}
      transition={{ duration: 0.3 }}
    >
      { isExpanded ?<div className="p-6 text-4xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 animate-text shadow-lg">
        Framer.ai
      </div>
    :  <div className="p-2 text-4xl font-bold font-serif text-transparent bg-clip-text flex justify-center bg-gradient-to-r from-blue-500 to-purple-600 animate-text shadow-lg">
    F
  </div>
    }

      <Button size="sm" className="outline mb-4 bg-gradient-to-r flex gap-2 items-center mx-2 from-blue-600  to-purple-600">
        <Crown className="w-4 h-4 " />
        {isExpanded &&
          "Upgrade to Premium"
        }
      </Button>
      <div className="p-3 flex  border-y  items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex gap-2 justify-between items-center cursor-pointer w-full">
              <div className="flex gap-2 items-center">
                <Avatar >
                  <AvatarImage src={user?.profileImageUrl} alt={user?.username} />
                  <AvatarFallback>{user?.username?.charAt(0)}</AvatarFallback>
                </Avatar>
                {isExpanded && <div >
                  <p className="text-sm font-medium">{user?.username}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>}
              </div>
              {isExpanded && <div>
                <ChevronRight />
              </div>}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="dark:bg-black bg-black text-white">
            <DropdownMenuItem className="hover:bg-gray-500 ">
              <Link href="/settings" className="flex gap-2 items-center">
                <Settings2 />
                Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-gray-500 flex gap-2 items-center cursor-pointer" onClick={handleOpenModal}>
              <LogOut />
              Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav className="flex-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <motion.div
              whileHover={{ backgroundColor: "#2C3E50" }}
              className="flex items-center px-4 py-3 text-xs text-gray-300 hover:text-white"
            >
              <item.icon className="w-6 h-6" />
              {isExpanded && <span className="ml-3 ">{item.label}</span>}
            </motion.div>
          </Link>
        ))}
      </nav>

      <Button
        onClick={() => setIsExpanded(!isExpanded)}
        className=" m-2 p-2 bg-gray-800 hover:bg-gray-700"
      >
        {isExpanded ? <ChevronsLeft /> : <ChevronsRight />}
      </Button>
    </motion.div>
  );

  return (
    <>
      <motion.aside
        className=" top-0 left-0 h-full z-50 py-12 hidden md:block"
        initial={false}
        animate={isExpanded ? "expanded" : "collapsed"}
        variants={sidebarVariants}
      >
        <SidebarContent />
      </motion.aside>

      <Sheet>
        <SheetTrigger asChild>
          <Button className="fixed top-4 left-4  md:hidden">Menu</Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[240px]  sm:w-[300px] p-0">
          <SidebarContent />
        </SheetContent>
      </Sheet>

      <ConfirmationModal
        open={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default SideNav;
