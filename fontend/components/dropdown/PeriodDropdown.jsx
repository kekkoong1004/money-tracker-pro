import { useState, useContext } from 'react';
import periodContext from '../../store/period-context';
import { viewTransactionPeriod } from '../../utils/categories';
import { IoIosArrowDropdown } from 'react-icons/io';

function PeriodDropdown() {
  const [selected, setSelected] = useState('Most Recent');
  const [showDropdown, setShowDropdown] = useState(false);
  const periodCtx = useContext(periodContext);

  const dropdownHandler = () => {
    setShowDropdown(prevState => !prevState);
  };

  const selectHandler = period => {
    if (period === 'All') {
      return;
    }
    const [quantity, unit] = period.split(' ');
    periodCtx.setPeriod({ quantity, unit });
    setShowDropdown(false);
    setSelected(period);
  };

  return (
    <div className="self-start ml-auto bg-white bg-opacity-50 px-4 py-2 text-lg relative cursor-pointer rounded-lg w-1/5 min-w-fit max-w-48 text-center">
      <div
        onClick={dropdownHandler}
        className="flex items-center justify-evenly"
      >
        {selected}
        <IoIosArrowDropdown size={25} />
      </div>
      {showDropdown && (
        <ul className="absolute left-0 top-12 flex flex-col w-full rounded-md overflow-hidden bg-white opacity-95">
          {viewTransactionPeriod.map(period => (
            <li
              key={period}
              className="py-1.5 pl-4 hover:bg-blue-600 hover:text-white transition"
              onClick={() => selectHandler(period)}
            >
              {period}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PeriodDropdown;
