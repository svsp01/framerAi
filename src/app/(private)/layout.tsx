import React from "react";
import SideNav from "./components/SideNav";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen">
      <SideNav />
      <main className="flex-grow  bg-gray-950  p-4 md:overflow-y-auto md:p-12">
        {children}
      </main>
    </div>
  );
}

export default Layout;
