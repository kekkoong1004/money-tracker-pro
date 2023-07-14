import { useState, useContext } from 'react';
import filterContext from '../../store/filter-context';
import { IoIosArrowDropdown } from 'react-icons/io';

function Dropdown({ options, category, defaultValue }) {
  const filterCtx = useContext(filterContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(filterCtx.filterData[category]);

  const dropdownHandler = () => {
    setIsOpen(prevState => !prevState);
  };

  let timer;

  const mouseLeftHandler = () => {
    if (isOpen) {
      timer = setTimeout(() => {
        setIsOpen(false);
      }, 300);
    }
  };

  const mouseOverHandler = () => {
    if (isOpen) {
      clearTimeout(timer);
    }
  };

  const selectHandler = opt => {
    setSelected(opt);
    const filter = { ...filterCtx.filterData };
    filter[category] = opt;
    filterCtx.updateFilter({ ...filter });
    setIsOpen(false);
  };

  return (
    <div>
      <div
        onClick={dropdownHandler}
        className="py-2 px-2 rounded-sm cursor-pointer flex items-center justify-around text-lg font-medium text-inherit"
      >
        {selected}
        <IoIosArrowDropdown
          size={25}
          className={`${isOpen ? 'rotate-180' : 'rotate-0'} transition`}
        />
      </div>
      <div className="relative">
        {isOpen && (
          <ul
            onMouseLeave={mouseLeftHandler}
            onMouseOver={mouseOverHandler}
            className="absolute top-1 bg-zinc-100 w-full text-center rounded-md"
          >
            {options.map(opt => (
              <li
                className="py-2 cursor-pointer hover:bg-indigo-300 
              hover:text-zinc-100 hover:font-medium
              transition rounded-md"
                key={opt}
                value={opt}
                onClick={() => selectHandler(opt)}
              >
                {opt}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Dropdown;
