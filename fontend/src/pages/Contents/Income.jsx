import React, { useEffect, useState } from 'react';
import Form from '../../../components/form/TransactionForm';
import IncomeItem from '../../../components/IncomeItem';
import useIncomes from '../../../hook/useIncomes';
import { totalIncome as calculateTotalIncome } from '../../../utils/incomes';
import { months } from '../../../utils/categories';
import LoadingIndicator from '../../../components/loading/LoadingIndicator';

function Income() {
  const todayDate = new Date().toISOString().split('T')[0];
  const { data, error, mutate, isLoading } = useIncomes(todayDate);
  const [totalIncome, setTotalIncome] = useState(0);
  const [displayIncomes, setDisplayIncomes] = useState([]);
  const thisMonthDigit = new Date(todayDate).getMonth();

  useEffect(() => {
    if (data && data.status === 'success') {
      setDisplayIncomes(data.data.slice(0, 4));
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      if (data.numOfResult !== 0) {
        const total = calculateTotalIncome(data.data);
        setTotalIncome(total);
      } else {
        setTotalIncome(0);
      }
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <LoadingIndicator />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center">
        Something went wrong...
      </div>
    );
  }

  return (
    <>
      <div className="flex justify-center items-center p-4 m-4">
        <h2 className="text-3xl font-bold">
          Total Income in {months[thisMonthDigit].name} :
        </h2>
        <p className="text-3xl font-semibold">
          <span className="text-green-600 ml-4">${totalIncome.toFixed(2)}</span>
        </p>
      </div>

      <div className="flex">
        <div className="flex flex-col w-[40%] p-4 text-gray-500">
          <h2 className=" text-center text-2xl font-bold mb-4">
            Add New Income
          </h2>
          <Form type="income" mutate={mutate} />
        </div>

        <div className="flex grow p-4 flex-col gap-4">
          <h2 className=" text-center text-2xl font-bold">
            Recent Incomes {`(${months[thisMonthDigit].name})`}
          </h2>
          {displayIncomes.map(income => (
            <IncomeItem
              type="income"
              key={income._id}
              data={income}
              mutate={mutate}
            ></IncomeItem>
          ))}
        </div>
      </div>
    </>
  );
}

export default Income;
