import { useState, useContext, useEffect } from 'react';
import periodContext from '../../../store/period-context';
import { getTransactions } from '../../../utils/retrieveData';
import { viewTransactionPeriod } from '../../../utils/categories';
import { IoIosArrowDropdown } from 'react-icons/io';
import { groupTransactionsToDate } from '../../../utils/helpers';
import LoadingIndicator from '../../../components/loading/LoadingIndicator';

function Transaction() {
  const periodCtx = useContext(periodContext);
  const { from, to } = periodCtx;
  const [transactions, setTransactions] = useState([]);
  const [groupedTransactions, setGroupedTransactions] = useState();
  const [selected, setSelected] = useState('Most Recent');
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const data = await getTransactions({ from, to });
      if (data.status !== 'failed') {
        setTransactions(data.mergedData);
      }
      setIsLoading(false);
    }

    getData();
  }, [from, to]);

  useEffect(() => {
    if (transactions.length !== 0) {
      const data = groupTransactionsToDate(transactions);
      setGroupedTransactions(data);
      // for (let key in data) {
      //   console.log(data[key]);
      // }
    }
  }, [transactions]);

  let timer;

  // if (groupedTransactions) {
  //   for (let key in groupedTransactions) {
  //     console.log(groupedTransactions[key]);
  //   }
  // }

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

  const showTransactionDetail = () => {};

  return (
    <div className="p-8 w-full h-full relative">
      {/* Drop down list for period selection */}
      <div
        onMouseOver={() => clearTimeout(timer)}
        onMouseLeave={() =>
          (timer = setTimeout(() => {
            setShowDropdown(false);
          }, 500))
        }
        className="ml-auto bg-amber-400 bg-opacity-30 rounded-lg px-4 py-2 text-lg relative cursor-pointer w-1/5 min-w-fit text-center shadow-lg"
      >
        <div
          onClick={dropdownHandler}
          className="flex items-center justify-evenly "
        >
          {selected}
          <IoIosArrowDropdown
            className={`${showDropdown ? 'rotate-180' : 'rotate-0'} transition`}
            size={25}
          />
        </div>
        {showDropdown && (
          <ul className="absolute left-0 top-12 flex flex-col w-full rounded-md overflow-hidden bg-white  shadow-md">
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
      {/* // Transactions content */}
      <div className="m-auto mt-8 h-full">
        <div className="w-4/5 h-[95%] mx-auto overflow-auto">
          {groupedTransactions &&
            Object.keys(groupedTransactions).map(date => (
              <div key={date} className="mb-8">
                <h4 className="text-center text-lg mb-2">{date}</h4>
                <ul className="flex flex-col gap-4">
                  {groupedTransactions[date].map(transaction => (
                    <li
                      onMouseDown={showTransactionDetail}
                      key={transaction._id}
                      className={`${
                        transaction.type === 'income'
                          ? 'self-end bg-green-400  bg-opacity-60 mr-2'
                          : 'bg-red-400 self-start bg-opacity-50 ml-2'
                      } group px-4 py-1.5 w-2/5 shadow-lg rounded-md hover:cursor-grab relative`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="text-lg font-medium overflow-hidden">
                          {transaction.title}
                        </div>

                        <div>
                          <span className="text-2xl">
                            {transaction.type === 'income' ? '+' : '-'}
                          </span>{' '}
                          <span className="text-lg font-medium">
                            {' $'}
                            {transaction.amount}
                          </span>
                        </div>
                      </div>
                      <div
                        /* // info box shown only hovering */
                        className={`absolute top-[50%] ${
                          transaction.type === 'income' ? 'left-1' : 'right-1'
                        } p-4 bg-yellow-100 hidden rounded-md z-50 group-hover:block w-[70%] shadow-md`}
                      >
                        <p className="py-1">
                          <span className="font-semibold">Date: </span>
                          {new Date(transaction.date).toDateString()}
                        </p>
                        <p className="py-1">
                          <span className="font-semibold">Time: </span>
                          {
                            new Date(transaction.date)
                              .toTimeString()
                              .split('G')[0]
                          }
                        </p>
                        <p className="py-1">
                          <span className="font-semibold">Category: </span>
                          {transaction.category}
                        </p>
                        <p
                          className={`${
                            transaction.description ? 'block' : 'hidden'
                          } py-1`}
                        >
                          <span className="font-semibold">Description :</span>{' '}
                          {transaction.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      </div>
      {isLoading && <LoadingIndicator />}
    </div>
  );
}

export default Transaction;
