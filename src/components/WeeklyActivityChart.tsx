import ReactApexChart from 'react-apexcharts';
import { useQuery } from '@tanstack/react-query';

interface WeeklyData {
  series: {
    name: string;
    data: number[];
  }[];
  categories: string[];
}

export default function WeeklyActivityChart() {
  const { data: chartData, isLoading } = useQuery({
    queryKey: ['/api/weeklyActivity'],
    queryFn: async () => {
      const response = await fetch('/src/data/weeklyActivityData.json');
      const data = await response.json();
      return data as WeeklyData;
    }
  });

  const options: any = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      },
      stacked: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '17px',
        endingShape: 'rounded',
        borderRadius: 5,
        distributed: false,
        dataLabels: {
          position: 'top',
        },
        barHeight: '100%',
        rangeBarOverlap: false,
        rangeBarGroupRows: false,
      },
    },
    states: {
      normal: {
        filter: {
          type: 'none',
        }
      },
      hover: {
        filter: {
          type: 'none',
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
        }
      },
    },
    colors: ['#000000', '#0066FF'],
    dataLabels: {
      enabled: false
    },
    grid: {
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true,
          strokeDashArray: 3
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
        }
      }
    },
    yaxis: {
      min: 0,
      max: 500,
      tickAmount: 5,
      labels: {
        style: {
          colors: '#718EBF',
          fontSize: '12px'
        },
        formatter: function(value: number) {
          return value.toString();
        }
      }
    },
    legend: {
      show: true,
      position: 'top',
      horizontalAlign: 'right',
      markers: {
        radius: 50,
        width: 12,
        height: 12,
        strokeWidth: 0,
        fillColors: ['#000000', '#0066FF'],
        offsetX: 0,
        offsetY: 0
      },
      fontSize: '14px',
      labels: {
        colors: '#718EBF'
      },
      itemMargin: {
        horizontal: 10
      }
    },
    stroke: {
      show: true,
      colors: ["transparent"],
      width: 5
    },
    tooltip: {
      shared: false,
      intersect: true,
    }
  };

  if (isLoading) {
    return <div className="h-[322px] section_card flex items-center justify-center">Loading chart...</div>;
  }

  return (
    <div className="h-[322px] section_card">
      <ReactApexChart
        options={options}
        series={chartData?.series || []}
        type="bar"
        height={250}
      />
    </div>
  );
}
