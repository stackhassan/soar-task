import { useQuery } from '@tanstack/react-query';
import TransactionItem from './TransactionItem';

interface Transaction {
  id: number;
  icon: string;
  iconBgColor: string;
  title: string;
  date: string;
  amount: string;
  amountColor: string;
}

export default function TransactionList() {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ['/api/transactions'],
    queryFn: async () => {
      const response = await fetch('/src/data/transactionsData.json');
      const data = await response.json();
      return data.transactions as Transaction[];
    }
  });

  if (isLoading) {
    return <div className="section_card flex items-center justify-center">Loading transactions...</div>;
  }

  return (
    <div className="section_card">
      <div className="space-y-9 max-h-[213px] overflow-y-auto pr-2 scrollbar-hide">
        {transactions?.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            icon={transaction.icon}
            iconBgColor={transaction.iconBgColor}
            title={transaction.title}
            date={transaction.date}
            amount={transaction.amount}
            amountColor={transaction.amountColor}
          />
        ))}
      </div>
    </div>
  );
}
