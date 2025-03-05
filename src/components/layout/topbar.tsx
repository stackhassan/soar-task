import { Bell, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/hooks/useUser";

interface TopbarProps {
  title: string;
  children?: ReactNode;
}

export function Topbar({ title, children }: TopbarProps) {
  const navigate = useNavigate();
  const { data: user, isLoading } = useUser();

  return (
    <div className="h-[120px] md:h-[100px] border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6 mt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 md:w-auto w-full">
          {children}
          <h1 className="text-[20px] md:text-[28px] font-semibold tracking-tight md:text-left text-center pr-6 flex-1 md:flex-none">
            {title}
          </h1>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative w-[255px] hidden md:block">
            <img
              src="/icons/search.svg"
              className="absolute left-4 top-1/2 -translate-y-1/2 size-[19.14px]"
            />
            <Input
              placeholder="Search for something"
              className="pl-12 h-[50px] bg-[#F5F7FA] text-[#8BA3CB] placeholder:text-[#8BA3CB] text-[15px] rounded-[40px] border-0 shadow-none focus:bg-[#F5F7FA]"
            />
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-muted hidden md:flex rounded-full size-[50px] cursor-pointer bg-gray-100"
              onClick={() => navigate("/settings")}
            >
              <img src="/icons/settings_top.svg" className="size-[25px]" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-muted  justify-center items-center hidden md:flex relative rounded-full size-[50px] bg-gray-100"
                >
                  <img
                    src="/icons/notification.svg"
                    className="h-[18.75px] w-auto cursor-pointer"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-auto">
                  <DropdownMenuItem className="p-4">
                    <div>
                      <p className="font-medium">Payment Successful</p>
                      <p className="text-sm text-muted-foreground">
                        Your payment of $2,500 has been processed
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        2 hours ago
                      </p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="p-4">
                    <div>
                      <p className="font-medium">New Login Detected</p>
                      <p className="text-sm text-muted-foreground">
                        A new login was detected from San Francisco
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        5 hours ago
                      </p>
                    </div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <img
                  src={user?.avatar}
                  alt="profile"
                  className="size-[35px] md:size-[60px] rounded-full cursor-pointer"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/account")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className=" flex justify-center mt-3">
        <div className="relative w-[90vw] md:hidden">
          <img
            src="/icons/search.svg"
            className="absolute left-4 top-1/2 -translate-y-1/2 size-[19.14px]"
          />
          <Input
            placeholder="Search for something"
            className="pl-12 h-[50px] bg-[#F5F7FA] text-[#8BA3CB] placeholder:text-[#8BA3CB] text-[15px] rounded-[40px] border-0 shadow-none focus:bg-[#F5F7FA]"
          />
        </div>
      </div>
    </div>
  );
}
