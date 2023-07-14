import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useState, useEffect, useContext } from 'react';
import { getFilterData } from '../../utils/retrieveData';
import filterContext from '../../store/filter-context';
import { initialLabelState } from '../../utils/helpers';
import LoadingIndicator from '../loading/LoadingIndicator';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Income',
    },
  },
};

const BarChart = () => {
  const filterCtx = useContext(filterContext);
  const { filterData } = filterCtx;
  const { view, month, year, filterBy } = filterData;
  const [labels, setLabels] = useState(
    initialLabelState(filterCtx.filterData.view)
  );
  const [dataSet, setDataSet] = useState([]);
  const [Loading, setIsLoading] = useState(false);

  async function runThis() {
    setIsLoading(true);
    let data;
    data = await getFilterData(filterData);

    if (data && data.status !== 'failed' && data.data.length !== 0) {
      const dataSet = data.data.map(cat => cat.totalAmount);
      setDataSet(dataSet);
      const labels = data.data.map(cat => cat._id);
      setLabels(labels);
    } else {
      setDataSet(data.data);
      setLabels(data.data);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    runThis();
  }, [view, month, year, filterBy]);

  const bgColor =
    view === 'Income' ? 'rgba(60, 186, 60, 0.7)' : 'rgba(255, 99, 132, 0.7)';

  const data = {
    labels: labels,
    datasets: [
      {
        label: `Total ${view}`,
        data: dataSet,
        backgroundColor: bgColor,
      },
    ],
  };

  if (!dataSet || dataSet.length === 0) {
    return (
      <p className="text-center text-lg pt-8">
        No data to show in particular filter year or category.
      </p>
    );
  }

  if (Loading) {
    return <LoadingIndicator />;
  }

  return <Bar options={options} data={data} />;
};

export default BarChart;
