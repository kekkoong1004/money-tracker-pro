import { useState, useEffect } from 'react';
import Form from '../../../components/form/TransactionForm';
import IncomeItem from '../../../components/IncomeItem';
import useExpenses from '../../../hook/useExpenses';
import { totalExpenses } from '../../../utils/expenses';
import { months } from '../../../utils/categories';

function Expense() {
  const todayDate = new Date().toISOString().split('T')[0];
  const { data, error, mutate, isLoading } = useExpenses(todayDate);
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const thisMonthDigit = new Date(todayDate).getMonth();

  useEffect(() => {
    if (data) {
      setExpenses(data.data.slice(0, 4));

      if (data.data !== 0) {
        const total = totalExpenses(data.data);
        setTotal(total);
      } else {
        setTotal(0);
      }
    }
  }, [data]);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <div className="flex justify-center items-center p-4 m-4">
        <h2 className="text-center  text-3xl font-bold">
          Total Expenses in {months[thisMonthDigit].name} :
        </h2>
        <p className="text-3xl font-semibold">
          <span className=" text-amber-600 ml-4">${total.toFixed(2)}</span>
        </p>
      </div>

      <div className="flex">
        <div className="flex flex-col w-[40%] p-4 text-gray-500">
          <h2 className=" text-center text-2xl font-bold mb-4">
            Add New Expense
          </h2>
          <Form type="expense" mutate={mutate} />
        </div>

        <div className="flex grow p-4 flex-col gap-4">
          <h2 className=" text-center text-2xl font-bold">
            Recent Expenses {`(${months[thisMonthDigit].name})`}
          </h2>
          {expenses.map(expense => (
            <IncomeItem
              key={expense._id}
              data={expense}
              mutate={mutate}
            ></IncomeItem>
          ))}
        </div>
      </div>
    </>
  );
}

export default Expense;
