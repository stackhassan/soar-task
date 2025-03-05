import { ReactNode, useState } from "react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom"; // Import useLocation

interface LayoutProps {
  children: ReactNode;
  title: string;
}

export function Layout({ children, title }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  const isRootPage = location.pathname === "/";

  const handleOverlayClick = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar className={`${isSidebarOpen ? 'flex' : 'hidden'} lg:flex fixed inset-y-0 z-50 w-64 bg-background border-r`} />
      <div className="flex-1 flex flex-col overflow-hidden w-full lg:pl-64">
        <Topbar title={title}>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-2"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <img src="/icons/menu.svg" className="h-[24px] w-[20px]" />
            </Button>
        </Topbar>
        <main className={`flex-1 overflow-auto p-4 lg:p-10 ${isRootPage ? 'md:bg-gray-100' : 'bg-gray-100'}`}>
          <div className="mx-auto space-y-4 lg:space-y-6 ">
            {children}
          </div>
        </main>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={handleOverlayClick}
        />
      )}
    </div>
  );
}
