import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

interface Card {
  id: number;
  type: string;
  number: string;
  expiry: string;
  holder: string;
  bank: string;
  balance: number;
  color: string;
  theme: string;
}

const PaymentLogo = ({
  theme,
  ...rest
}: {
  theme: string;
  [key: string]: any;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="50"
      viewBox="0 0 200 100"
      {...rest}
    >
      <circle
        cx="100"
        cy="50"
        r="40"
        fill={theme === "dark" ? "#FFFFFF80" : "#00000080"}
      />
      <circle
        cx="140"
        cy="50"
        r="40"
        fill={theme === "dark" ? "#FFFFFF80" : "#00000080"}
      />
    </svg>
  );
};

export default function Cards({ showAll = false }) {
  const [visibleCardNumbers, setVisibleCardNumbers] = useState<{
    [key: number]: boolean;
  }>({});

  const { data: cards, isLoading } = useQuery({
    queryKey: ['/api/cards'],
    queryFn: async () => {
      const response = await fetch('/data/cardsData.json');
      const data = await response.json();
      return data.cards as Card[];
    }
  });

  const toggleCardNumber = (cardId: number) => {
    setVisibleCardNumbers((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const formatCardNumber = (number: string, cardId: number) => {
    if (!visibleCardNumbers[cardId]) {
      return number.slice(0, 4) + " **** **** " + number.slice(-4);
    }
    return number.replace(/(\d{4})/g, "$1 ").trim();
  };

  if (isLoading) {
    return (
      <div className="col-span-12 md:col-span-8 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="section_title">My Cards</h3>
          <h3 className="text-[17px]">See All</h3>
        </div>
        <div className="flex items-center justify-center h-[200px]">
          Loading cards...
        </div>
      </div>
    );
  }

  const displayCards = showAll ? cards : cards?.slice(0, 2);

  return (
    <div className={`${showAll ? 'col-span-12' : 'col-span-12 xl:col-span-8'} space-y-4 `}>
      <div className="flex items-center justify-between">
        <h3 className="section_title">My Cards</h3>
        {!showAll && (
          <Link
            to="/credit-cards"
            className="text-[17px] hover:underline cursor-pointer"
          >
            See All
          </Link>
        )}
      </div>

      <div className={`${showAll ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]' : 'flex gap-[30px] overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0'}`}>
        {displayCards?.map((card) => (
          <div key={card.id} className="w-[280px] md:w-[450px] flex-none">
            <div
              className={`rounded-t-[15px] md:rounded-t-[25px] bg-gradient-to-br ${
                card.color
              } px-5 py-4 md:p-6 ${
                card.theme === "dark"
                  ? "text-white"
                  : "text-black border-[#DFAF2] border-[1px]"
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[11px] lg:text-[12px] opacity-75">
                    Balance
                  </div>
                  <div className="text-[16px] lg:text-[20px] font-semibold">
                    ${card.balance.toLocaleString()}
                  </div>
                </div>
                <div className="-mr-[5px] md:mr-0">
                  <img src={card.theme === 'dark' ? "Chip_Card.png": "Chip_Card_black.png"} className="size-[34px]" />
                </div>
              </div>

              <div className="mt-3 md:mt-6 flex items-center">
                <div className="flex-1">
                  <div className="text-[10px] lg:text-xs opacity-75 uppercase">
                    Card Holder
                  </div>
                  <div className="font-semibold text-[13px] lg:text-[15px]">
                    {card.holder}
                  </div>
                </div>
                <div className="mr-8 md:mr-24">
                  <div className="text-[10px] lg:text-xs opacity-75 uppercase">
                    Valid Thru
                  </div>
                  <div className="font-semibold text-[13px] lg:text-[15px]">
                    {card.expiry}
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`rounded-b-[15px] md:rounded-b-[25px] px-5 py-2 md:p-6 ${
                card.theme === "dark"
                  ? `text-white bg-gradient-to-br ${card.color}`
                  : `text-black border-[#DFAF2] ${card.color} border-[1px]`
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <div className="text-[15px] lg:text-[22px] min-w-[155px] md:min-w-[230px]">
                    {formatCardNumber(card.number, card.id)}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleCardNumber(card.id)}
                    className="text-sm -ml-[5px] md:ml-0"
                  >
                    {visibleCardNumbers[card.id] ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <div className="md:-mr-[10px]">
                  <PaymentLogo
                    theme={card.theme}
                    className="w-[60px] md:w-[150px] md:-mr-6"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
