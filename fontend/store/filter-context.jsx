import React, { useState } from 'react';
import { months } from '../utils/categories';

const filterContext = React.createContext({
  filterData: {
    view: null,
    month: null,
    year: null,
    chart: null,
    filterBy: null,
  },
  activeFilter: () => {},
  updateFilter: data => {},
});

export const FilterContextProvider = ({ children }) => {
  const [filter, setFilter] = useState({
    filterBy: 'All time',
    view: 'Income',
    year: new Date().getFullYear(),
    month: months[new Date().getMonth()].name,
    chart: 'Bar Chart',
  });

  const updateFilter = data => {
    setFilter(data);
  };

  const getFilterData = async () => {
    let query = {};
    if (filter.filterBy === 'Yearly') {
      query = {
        ...filter,
        month: null,
      };
      const data = await getDataByFilter(query);
      return data;
    }
  };

  const context = {
    filterData: filter,
    activeFilter: () => {},
    updateFilter: updateFilter,
    filterBy: 'Filter By',
    getFilterData: getFilterData,
  };

  return (
    <filterContext.Provider value={context}>{children}</filterContext.Provider>
  );
};

export default filterContext;
