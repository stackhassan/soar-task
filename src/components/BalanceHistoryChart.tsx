import ReactApexChart from 'react-apexcharts';
import { useQuery } from '@tanstack/react-query';

interface BalanceData {
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
}

export default function BalanceHistoryChart() {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['/api/balanceHistory'],
    queryFn: async () => {
      const response = await fetch('/src/data/balanceHistoryData.json');
      const data = await response.json();
      return data as BalanceData;
    }
  });

  const options: any = {
    chart: {
      type: 'area',
      height: 276,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    colors: ['#4318FF'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2
    },
    grid: {
      borderColor: '#f1f1f1',
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 10
      },
      xaxis: {
        lines: {
          show: true,
        }
      },
      yaxis: {
        lines: {
          show: true,
        }
      }
    },
    xaxis: {
      categories: chartData?.categories || [],
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      labels: {
        style: {
          colors: '#718EBF',
          fontSize: '12px'
        },
        offsetY: 5
      }
    },
    yaxis: {
      show: true,
      min: 0,
      max: 800,
      tickAmount: 4,
      labels: {
        style: {
          colors: '#718EBF',
          fontSize: '12px'
        },
        formatter: function(value: number) {
          return value.toString();
        },
        offsetX: -10
      }
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      x: {
        show: false
      }
    }
  };

  if (isLoading) {
    return <div className="h-[276px] section_card flex items-center justify-center">Loading chart...</div>;
  }

  return (
    <div className="h-[276px] section_card">
      <ReactApexChart
        options={options}
        series={chartData?.series || []}
        type="area"
        height={250}
      />
    </div>
  );
}
