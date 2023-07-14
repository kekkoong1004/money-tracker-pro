import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { incomeCategories, expenseCategories } from '../../utils/categories';
import { capitalizeFirstLetter } from '../../utils/helpers';
import { addIncome } from '../../utils/incomes';
import { addExpense } from '../../utils/expenses';

function Form({ type, mutate, contentData, onUpdate, changeContentShown }) {
  const [date, setDate] = useState(
    contentData ? new Date(contentData.date) : new Date()
  );
  const [title, setTitle] = useState(contentData ? contentData.title : '');
  const [amount, setAmount] = useState(contentData ? contentData.amount : '');
  const [category, setCategory] = useState(
    contentData
      ? contentData.category
      : type === 'income'
      ? incomeCategories[0].name
      : expenseCategories[0].name
  );
  const [description, setDescription] = useState(
    contentData ? contentData.description : ''
  );
  const [notification, setNotification] = useState(null);
  const [buttonDisabled, setButtonDisable] = useState(false);

  const submitHandler = async e => {
    e.preventDefault();
    setButtonDisable(true);
    setNotification({ status: 'pending', message: 'Submitting...' });
    const formField = {
      date,
      title,
      amount: +amount,
      category,
      description,
    };

    let submissionType;
    if (contentData) {
      submissionType = 'existing';
    } else {
      submissionType = 'new';
    }

    if (submissionType === 'new') {
      if (!date || !title || !amount || !category) {
        console.log('Info no enough....');
        return;
      }
      let result;
      if (type === 'income') {
        result = await addIncome(formField);
      } else if (type === 'expense') {
        result = await addExpense(formField);
      } else {
        return;
      }

      console.log('result added');
      if (result.status === 'failed') {
        setNotification({ status: 'failed', message: `Failed to add ${type}` });
      }

      mutate();
      setDate(new Date());
      setTitle('');
      setAmount('');
      setCategory(
        type === 'income' ? incomeCategories[0].name : expenseCategories[0].name
      );
      setDescription('');
      setNotification({
        status: 'success',
        message: `Successfully submitted ${type}`,
      });
    }

    if (submissionType === 'existing') {
      await onUpdate(formField);
      setNotification({
        status: 'success',
        message: `Successfully updated ${type}`,
      });
    }
    setButtonDisable(false);
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="mb-2 relative">
        <DatePicker
          id="date"
          className="w-full h-12 text-center  rounded-md outline-none border-none p-2 text=lg placeholder:text-gray-300 "
          dateFormat="dd/MM/yyyy p"
          selected={date}
          onChange={date => setDate(date)}
        />
      </div>

      <div className="relative group-item">
        <label
          className="absolute block top-1 left-2 text-sm font-semibold "
          htmlFor="title"
        >
          Title
        </label>
        <input
          id="title"
          className="block w-full h-12 rounded-md outline-none border-none p-2 text=lg placeholder:text-gray-300, text-center"
          type="text"
          minLength="3"
          required
          placeholder={type === 'income' ? 'Exp: Salary' : 'Exp: Rental'}
          maxLength={20}
          onChange={e => setTitle(e.target.value)}
          value={title}
        />
      </div>

      <div className="mt-2 relative">
        <label
          className="absolute block top-1 left-2 text-sm font-semibold "
          htmlFor="amount"
        >
          Amount
        </label>
        <input
          id="amount"
          className="block w-full h-12 rounded-md outline-none border-none p-2 text=lg placeholder:text-gray-300, text-center"
          type="number"
          required
          placeholder="Exp: 200.00"
          value={amount}
          onChange={e => setAmount(+e.target.value)}
          min={1}
          step={0.01}
        />
      </div>

      <div className="mt-2 flex bg-white rounded-md h-12 p-2 w-full">
        <label className="text-sm font-semibold " htmlFor="category">
          Category
        </label>
        <select
          className="mx-auto w-4/5 border-none outline-none text-center text-lg "
          name="category"
          id="category"
          required
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          {(contentData?.type === 'income' || type === 'income') &&
            incomeCategories.map(cat => (
              <option key={cat.id} className="" id={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          {(contentData?.type === 'expense' || type === 'expense') &&
            expenseCategories.map(cat => (
              <option key={cat.id} className="" id={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
        </select>
      </div>

      <div className="mt-2 relative">
        <label
          className="absolute block top-1 left-2 text-sm font-semibold "
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="w-full rounded-md text-center text-lg pt-8 px-4 outline-none overflow-hidden resize-none"
          name="description"
          id="description"
          cols="30"
          rows="2"
          maxLength={100}
          placeholder="Optional..."
          value={description}
          onChange={e => setDescription(e.target.value)}
        ></textarea>
      </div>

      <button
        disabled={buttonDisabled}
        className={`w-full bg-slate-800 mt-2 p-2 text-white rounded-lg font-semibold hover:font-bold hover:text-md hover:bg-slate-500 transition`}
      >
        {contentData
          ? 'Save Change'
          : notification && notification.status === 'pending'
          ? `${notification.message}`
          : `Add ${capitalizeFirstLetter(type)}`}{' '}
      </button>
      {contentData && (
        <button
          onClick={() => {
            const num = contentData.type === 'income' ? 1 : 2;
            changeContentShown(num);
          }}
          type="button"
          className="w-full bg-slate-800 mt-2 p-2 text-white rounded-lg font-semibold hover:font-bold hover:text-md hover:bg-slate-500 transition"
        >
          Back
        </button>
      )}
    </form>
  );
}

export default Form;
