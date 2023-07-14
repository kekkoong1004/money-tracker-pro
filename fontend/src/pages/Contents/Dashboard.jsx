import { useContext, useEffect, useState } from 'react';
import filterContext from '../../../store/filter-context';

import BarChart from '../../../components/chart/barChart';
import PieChart from '../../../components/chart/PieChart';
import Dropdown from '../../../components/dropdown/CategoriesDropdown';

import { months, charts } from '../../../utils/categories';
import { getAllYears } from '../../../utils/retrieveData';

function Dashboard() {
  const filterCtx = useContext(filterContext);
  const {
    filterData: { view, chart, filterBy },
  } = filterCtx;
  const [years, setYears] = useState([]);

  useEffect(() => {
    async function getYears() {
      const years = await getAllYears(view);
      if (years === null) {
        return;
      }
      if (years) {
        const yearsArray = [];
        for (let i = years.oldestYear; i <= years.latestYear; i++) {
          yearsArray.push(i);
        }
        setYears(yearsArray);
      }
    }
    getYears();
  }, [view]);

  return (
    <div className="w-full h-full p-8 flex flex-col">
      <div className="flex bg-zinc-100 rounded-md shadow-lg">
        <div className="grow">
          <Dropdown
            options={['Yearly', 'Monthly', 'All time']}
            category={'filterBy'}
          />
        </div>
        <div className="grow">
          <Dropdown options={['Income', 'Expense']} category={'view'} />
        </div>
        {filterBy === 'Monthly' && (
          <div className="grow">
            <Dropdown
              options={months.map(month => month.name)}
              category={'month'}
            />
          </div>
        )}
        {filterBy !== 'All time' && (
          <div className="grow">
            <Dropdown options={years} category={'year'} />
          </div>
        )}
        <div className="grow">
          <Dropdown options={charts} category={'chart'} />
        </div>
      </div>

      <div className="w-full h-full flex justify-center items-center overflow-auto">
        {chart.toLowerCase().substring(0, 3) === 'bar' && (
          <div className="w-3/4 h-2/3 flex justify-center items-center">
            <BarChart />
          </div>
        )}
        {chart.toLowerCase().substring(0, 3) === 'pie' && (
          <div className="h-full w-full p-4 flex justify-center items-center">
            <PieChart />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
