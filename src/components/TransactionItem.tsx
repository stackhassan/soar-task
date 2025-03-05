import React from 'react';

interface TransactionItemProps {
  icon: string;
  iconBgColor: string;
  title: string;
  date: string;
  amount: string;
  amountColor: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  icon,
  iconBgColor,
  title,
  date,
  amount,
  amountColor,
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className={`h-12 w-12 rounded-full ${iconBgColor} flex items-center justify-center`}>
        <img src={icon} alt={title} className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-[14px] lg:text-[16px]">{title}</p>
        <p className="text-[12px] lg:text-[15px] text-muted-foreground">{date}</p>
      </div>
      <div className={amountColor}>{amount}</div>
    </div>
  );
};

export default TransactionItem;
