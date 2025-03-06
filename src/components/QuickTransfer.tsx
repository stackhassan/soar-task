import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useState, useRef, useEffect, KeyboardEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  name: string;
  position: string;
  avatar: string;
}

export default function QuickTransfer() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [showRightScrollButton, setRightShowScrollButton] = useState(true);
  const [showLeftScrollButton, setShowLeftScrollButton] = useState(false);
  const [amount, setAmount] = useState<string>("");
  const [isError, setIsError] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();

  const { data: users, isLoading } = useQuery({
    queryKey: ["/api/quickTransferUsers"],
    queryFn: async () => {
      // In a real app, this would be an API call
      const response = await fetch("/data/quickTransferUsers.json");
      const data = await response.json();
      return data.users as User[];
    },
  });

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setRightShowScrollButton(scrollLeft < scrollWidth - clientWidth - 10);
      setShowLeftScrollButton(scrollLeft > 10);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 150;
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 150;
    }
  };

  const handleSend = () => {
    if (!amount.trim()) {
      setIsError(true);
      return;
    }
    toast({
      title: "Transfer Successful",
      description: `$${amount} has been sent successfully.`,
      duration: 3000,
    });
    setAmount("");
    setIsError(false);
    setSelectedUserId(null);
    inputRef.current?.focus(); // Return focus to input after sending };
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  }

    useEffect(() => {
      const scrollContainer = scrollContainerRef.current;
      if (scrollContainer) {
        handleScroll();
        scrollContainer.addEventListener("scroll", handleScroll);
        return () =>
          scrollContainer.removeEventListener("scroll", handleScroll);
      }
    }, []);

    useEffect(() => {
      inputRef.current?.focus();
    }, []);

    useEffect(() => {
      if (!isLoading && users) {
        handleScroll();
      }
    }, [isLoading, users]);

    return (
      <div className="h-[276px] section_card flex flex-col justify-center">
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-auto pb-4 scrollbar-hide"
            style={{ scrollBehavior: "smooth" }}
          >
            {isLoading ? (
              <div className="w-full text-center">Loading users...</div>
            ) : (
              users?.map((user) => (
                <div
                  key={user.id}
                  tabIndex={0}
                  role="button"
                  aria-pressed={selectedUserId === user.id}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedUserId(user.id);
                    }
                  }}
                  className={`flex-none w-[120px] flex flex-col items-center gap-1 mb-4 p-2 rounded-lg hover:bg-accent cursor-pointer`}
                  onClick={() => setSelectedUserId(user.id)}
                >
                  <img src={user.avatar} className="h-12 w-12 rounded-full" alt={`${user.name}'s avatar`} />

                  <div className="flex flex-col items-center pb-4">
                    <p
                      className={`text-center truncate ${
                        selectedUserId === user.id ? "font-bold" : ""
                      }`}
                    >
                      {user.name}
                    </p>
                    <p
                      className={`text-sm text-center text-muted-foreground truncate ${
                        selectedUserId === user.id ? "font-bold" : ""
                      }`}
                    >
                      {user.position}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
          {showLeftScrollButton && (
            <button
              onClick={scrollLeft}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
          {showRightScrollButton && (
            <button
              onClick={scrollRight}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
        <div className="flex items-center space-x-4 mt-4">
          <p className="text-[16px] text-[#718EBF]/70">Write Amount</p>
          <div className="relative flex-1">
            <Input
              type="text"
              placeholder="525.50"
              ref={inputRef}
              onKeyDown={handleKeyPress}
              aria-label="Transfer amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setIsError(false);
              }}
              className={`w-full h-[50px] pl-4 pr-24 rounded-[50px] outline-none bg-[#EDF1F7] ${
                isError ? "border-2 border-red-500" : "border-none"
              }`}
            />
            <Button
              onClick={handleSend}
              aria-label="Send transfer"
              className="absolute cursor-pointer lg:w-[125px] h-[50px] right-0 top-1/2 -translate-y-1/2 bg-black text-white hover:bg-black/80 active:bg-black/70 transition-colors duration-200 rounded-[40px] px-4"
            >
              Send
              <img src="/icons/send.svg" className="h-[22.59px] w-auto" />
            </Button>
          </div>
        </div>
      </div>
    );
  };
