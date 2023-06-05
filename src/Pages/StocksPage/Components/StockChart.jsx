import { useState } from "react";
import Chart from "react-apexcharts";
import { Stack, Button } from "@chakra-ui/react";
import { color } from "framer-motion";

function StockChart({ chartData, symbol }) {
  const [dateFormat, setDateFormat] = useState("24h");
  const { day, week, year } = chartData;

  const determineTimeFormat = () => {
    switch (dateFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };

  const color =
    determineTimeFormat()[determineTimeFormat().length - 1].y -
      determineTimeFormat()[0].y >
    0
      ? "#26c281"
      : "#ed3419";

  const options = {
    colors: [color],
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    chart: {
      id: "stock data",
      animations: {
        speed: 1300,
      },
    },
    xaxis: {
      type: "datetime",
      labels: {
        datetimeUTC: false,
      },
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM",
      },
    },
  };

  const series = [{ name: symbol, data: determineTimeFormat() }];

  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="area"
        height="700px"
        width="100%"
      />
      <Stack direction="row" spacing={4} align="center" ml="30px">
        <Button
          colorScheme="gray"
          backgroundColor={dateFormat === "24h" ? "blue.100" : "white"}
          variant="outline"
          onClick={() => setDateFormat("24h")}
        >
          1 day
        </Button>
        <Button
          colorScheme="gray"
          backgroundColor={dateFormat === "7d" ? "blue.100" : "white"}
          variant="outline"
          onClick={() => setDateFormat("7d")}
        >
          1 week
        </Button>
        <Button
          colorScheme="gray"
          backgroundColor={dateFormat === "1y" ? "blue.100" : "white"}
          variant="outline"
          onClick={() => setDateFormat("1y")}
        >
          1 year
        </Button>
      </Stack>
    </div>
  );
}

export default StockChart;
