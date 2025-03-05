import { Layout } from "@/components/layout/layout";
import WeeklyActivityChart from "@/components/WeeklyActivityChart";
import ExpenseStatisticsChart from "@/components/ExpenseStatisticsChart";
import BalanceHistoryChart from "@/components/BalanceHistoryChart";
import QuickTransfer from "@/components/QuickTransfer";
import TransactionList from "@/components/TransactionList";
import Cards from "@/components/Cards";

export default function Dashboard() {
  return (
    <Layout title="Overview">
      <div className="space-y-4">
        <div className="grid grid-cols-12 gap-[30px]">
          {/* Cards Section */}
          <Cards />

          {/* Recent Transaction */}
          <div className="col-span-12 xl:col-span-4 space-y-4">
            <h3 className="section_title">Recent Transaction</h3>
            <TransactionList />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Weekly Activity */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            <h3 className="section_title">Weekly Activity</h3>

            <WeeklyActivityChart />
          </div>

          {/* Expense Statistics */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <h3 className="section_title">Expense Statistics</h3>
            <ExpenseStatisticsChart />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          {/* Quick Transfer */}
          <div className="col-span-12 xl:col-span-4 space-y-4">
            <h3 className="section_title">Quick Transfer</h3>
            <QuickTransfer />
          </div>

          {/* Balance History */}
          <div className="col-span-12 xl:col-span-8 space-y-4">
            <h3 className="section_title">Balance History</h3>
            <BalanceHistoryChart />
          </div>
        </div>
      </div>
    </Layout>
  );
}
