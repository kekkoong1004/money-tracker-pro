import { useState, useContext } from 'react';
import userContext from '../store/user-context';
import DisplayIcon from './DisplayIcon';
import { deleteIncome } from '../utils/incomes';
import { deleteExpense } from '../utils/expenses';
import LoadingSpinner from './loading/LoadingSpinner';

function IncomeItem({ data, mutate }) {
  const { title, amount, category, date, _id, type } = data;
  const readableDate = date.split('T')[0];
  const userCtx = useContext(userContext);
  const [deleteIsLoading, setDeleteIsLoading] = useState(false);

  const deleteHandler = async e => {
    e.stopPropagation();
    setDeleteIsLoading(true);
    // await new Promise(resolve => setTimeout(resolve, 5000));
    if (type === 'income') {
      await deleteIncome(_id);
    } else if (type === 'expense') {
      await deleteExpense(_id);
    }
    setDeleteIsLoading(false);
    console.log('delete item before');
    mutate();
    console.log('delete item after');
  };

  const onClickHandler = () => {
    if (deleteIsLoading) {
      return;
    }
    userCtx.changeContentShown(5, data);
  };

  return (
    <div
      onClick={onClickHandler}
      className="flex items-center gap-8 bg-yellow-300 bg-opacity-40 py-4 px-4 rounded-md shadow-md cursor-pointer hover:bg-yellow-200 transition"
    >
      <div className="text-green-400 text-3xl overflow-hidden w-10">
        <DisplayIcon icon={category}></DisplayIcon>
      </div>

      <div className="flex items-center">
        <h5 className="text-lg font-bold text-blue-950 w-36">{title}</h5>
        <h4 className="bg-white py-2 px-4 rounded-lg text-lg font-bold w-32">
          ${amount.toFixed(2)}
        </h4>
      </div>

      <div className="text-sm text-emerald-800 font-semibold">
        {readableDate}
      </div>
      <button
        disabled={deleteIsLoading}
        onClick={deleteHandler}
        className="text-xl p-2 hover:scale-110 hover:text-red-700 transition "
      >
        {deleteIsLoading ? (
          <LoadingSpinner />
        ) : (
          <DisplayIcon icon="trash"></DisplayIcon>
        )}
      </button>
    </div>
  );
}

export default IncomeItem;
