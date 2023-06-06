import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";
import { Container } from "@chakra-ui/react";

Chart.register(ArcElement);

function DoughnutGraph({ graphData }) {
  const [data, setData] = useState([]);
  const config = {
    data: {
      datasets: [
        {
          label: "Expense Tracker",
          data: data,
          backgroundColor: [
            "#ad2c2a",
            "#e3da29",
            "#34ad26",
            "#8c59d4",
            "#d4597e",
            "#29c5bf",
          ],
          hoverOffset: 4,
          borderRadius: 20,
          spacing: 10,
          borderwidth: 5,
        },
      ],
    },
    options: {
      cutout: 180,
    },
  };
  useEffect(() => {
    const temp = [...graphData];
    temp.pop();
    setData(temp);
  }, [graphData]);

  return (
    <Container mb="30px">
      <Doughnut {...config}></Doughnut>
    </Container>
  );
}
export default DoughnutGraph;
