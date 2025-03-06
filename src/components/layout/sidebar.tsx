import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Dashboard", href: "/", icon: "/icons/home.svg" },
  {
    name: "Transactions",
    href: "/transactions",
    icon: "/icons/transaction.svg",
  },
  { name: "Account", href: "/account", icon: "/icons/user_icon.svg" },
  { name: "Investments", href: "/investments", icon: "/icons/investments.svg" },
  {
    name: "Credit Cards",
    href: "/credit-cards",
    icon: "/icons/credit_cards.svg",
  },
  { name: "Loans", href: "/loans", icon: "/icons/loans.svg" },
  { name: "Services", href: "/services", icon: "/icons/services.svg" },
  { name: "My Privileges", href: "/privileges", icon: "/icons/privaliges.svg" },
  { name: "Settings", href: "/settings", icon: "/icons/settings_sidebar.svg" },
];

export function Sidebar({ className }: { className?: string }) {
  const location = useLocation();

  return (
    <div className={cn("flex flex-col h-full bg-sidebar border-r", className)}>
      <div className="pl-11 pt-6 md:pt-9">
        <Link to="/" className="text-[17px] hover:underline cursor-pointer">
          <div className="flex h-8 items-center gap-2">
            <img src="/icons/task.svg" className="h-[29.16px] w-auto" />
            <span className="font-semibold tracking-tight text-[25px]">
              Soar Task
            </span>
          </div>
        </Link>
      </div>

      <nav className="flex-1">
        <div className="space-y-[15px] md:space-y-[25px] pt-[40px] md:pt-[64px]">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;

            return (
              <Link key={item.name} to={item.href} className="block relative">
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute -left-[1px] top-1/2 -translate-y-1/2 w-[6px] h-[40px] md:h-[60px] bg-black rounded-r-[10px]" />
                )}
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3 pl-11 text-[12px] md:text-[18px] cursor-pointer",
                    isActive ? "opacity-100" : "opacity-50 hover:opacity-75"
                  )}
                >
                  <img src={Icon} className="h-[18px] md:h-[25px] w-auto" />
                  {item.name}
                </Button>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
