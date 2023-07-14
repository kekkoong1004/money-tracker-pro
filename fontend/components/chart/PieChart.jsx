import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useState, useEffect, useContext } from 'react';
import filterContext from '../../store/filter-context';
import { getFilterData } from '../../utils/retrieveData';
import { initialLabelState } from '../../utils/helpers';

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

// function getRandomColor() {
//   // Generate random values for red, green, and blue channels
//   const red = Math.floor(Math.random() * 255);
//   const green = Math.floor(Math.random() * 255);
//   const blue = Math.floor(Math.random() * 255);

//   // Construct the RGB color string
//   const bgColor = `rgba(${red}, ${green}, ${blue}, 0.85)`;
//   const borderColor = `rgba(${red}, ${green}, ${blue}, 0.3)`;

//   return { bgColor, borderColor };
// }

function PieChart() {
  const filterCtx = useContext(filterContext);
  const { filterData } = filterCtx;
  const { view, month, year, filterBy } = filterData;
  const [dataSet, setDataSet] = useState([]);
  const [labels, setLabels] = useState(
    initialLabelState(filterCtx.filterData.view)
  );
  // const [colors, setColors] = useState([]);

  useEffect(() => {
    async function getData() {
      const data = await getFilterData(filterData);
      if (data) {
        const dataSet = data.data.map(cat => cat.totalAmount);
        setDataSet(dataSet);
        const labels = data.data.map(cat => cat._id);
        setLabels(labels);
      }
    }
    getData();
  }, [view, month, year, filterBy]);

  // useEffect(() => {
  //   const colors = labels.map(cat => {
  //     const color = getRandomColor();
  //     return color;
  //   });
  //   setColors(colors);
  // }, []);

  const data = {
    labels: labels,
    datasets: [
      {
        label: `Total ${view}`,
        data: dataSet,
        // backgroundColor: colors.map(color => color.bgColor),
        // borderColor: colors.map(color => color.borderColor),
        borderWidth: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    layout: {
      padding: 0,
    },
    plugins: {
      colors: {
        enabled: true,
        forceOverride: true,
      },
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: `${view} by Categories`,
        font: {
          size: 18,
        },
        padding: 5,
      },
    },
  };

  if (!dataSet || dataSet.length === 0) {
    return (
      <p className="text-center text-lg pt-8">
        No data to show in particular filter year or category.
      </p>
    );
  }
  return <Pie data={data} options={options} />;
}

export default PieChart;
