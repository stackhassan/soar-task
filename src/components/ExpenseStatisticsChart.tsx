import ReactApexChart from 'react-apexcharts';
import { useQuery } from '@tanstack/react-query';

interface ExpenseData {
  series: number[];
  labels: string[];
}

export default function ExpenseStatisticsChart() {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['/api/expenseStatistics'],
    queryFn: async () => {
      const response = await fetch('/data/expenseStatisticsData.json');
      const data = await response.json();
      return data as ExpenseData;
    }
  });

  const pieOptions: any = {

    labels: chartData?.labels || [],
    colors: ['#2B3674', '#4318FF', '#F6866A', '#000000'],
    stroke: {
      width: 5,
      colors: ["#fff"]
    },
    dataLabels: {
      enabled: true,
      formatter: function(val: number) {
        return `${val.toFixed(0)}%`;
      },
      style: {
        fontSize: '14px',
        fontWeight: 600,
        colors: ['#fff']
      },
      background: {
        enabled: false
      },
      dropShadow: {
        enabled: false
      }
    },
    legend: {
      show: false
    }
  };

  if (isLoading) {
    return (
      <div className="h-[322px] section_card flex items-center justify-center">
        Loading chart...
      </div>
    );
  }

  return (
    <div className="h-[322px] section_card p-4">
      <ReactApexChart
        options={pieOptions}
        series={chartData?.series || []}
        type="pie"
        height={250}
      />
    </div>
  );
}
