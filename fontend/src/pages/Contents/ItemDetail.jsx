import { useContext, useState } from 'react';
import userContext from '../../../store/user-context';
import Form from '../../../components/form/TransactionForm';
import Popup from '../../../components/popup/Popup';
import Backdrop from '../../../components/popup/backdrop';
import { updateExpense } from '../../../utils/expenses';
import { capitalizeFirstLetter } from '../../../utils/helpers';
import { deleteExpense } from '../../../utils/expenses';

function ItemDetail() {
  const userCtx = useContext(userContext);
  const { contentData, changeContentShown } = userCtx;
  const { _id, user, type } = contentData;
  const [notification, setNotification] = useState(null);
  const [popup, setPopup] = useState(false);

  const updateHandler = async formField => {
    setNotification(null);
    const result = await updateExpense(_id, formField);
    if (result.status === 'success') {
      setNotification({
        status: 'success',
        message: `Successfully updated ${type}!`,
      });
    }
    if (result.status === 'failed') {
      setNotification({
        status: 'failed',
        message: `Updated ${type} failed! Please try again.`,
      });
    }
  };

  const confirmDelete = async () => {
    setNotification({
      status: 'pending',
      message: `pending...`,
    });
    const result = await deleteExpense(_id);
    if (result.status === 'success') {
      setNotification({
        status: 'success',
        message: `Successfully delete ${type} item`,
      });
      setPopup(false);
      setTimeout(() => {
        const num = type === 'income' ? 1 : 2;
        changeContentShown(num);
      }, 1000);
    } else {
      setNotification({
        status: 'failed',
        message: `Delete ${type} item failed`,
      });
    }
    setPopup(false);
  };

  const cancelDelete = () => {
    setPopup(false);
  };

  return (
    <div className={`p-4 w-3/4 mx-auto relative overflow-scroll`}>
      <h1 className="my-4 text-center text-2xl font-bold">
        {capitalizeFirstLetter(type)} Item
      </h1>

      <Form
        contentData={contentData}
        onUpdate={updateHandler}
        changeContentShown={changeContentShown}
      />
      <div className="mt-4">
        {notification && (
          <p
            className={`text-center text-lg ${
              notification.status === 'success'
                ? 'text-green-500'
                : 'text-red-500'
            } font-medium`}
          >
            {notification.message}
          </p>
        )}
        <button
          onClick={() => setPopup(true)}
          type="button"
          className="bg-red-500 w-full py-2 rounded-lg text-white font-semibold"
        >
          {notification && notification.status === 'pending'
            ? notification.message
            : 'Delete Item'}
        </button>
      </div>
      {popup && (
        <Backdrop>
          <Popup onConfirm={confirmDelete} onCancel={cancelDelete} />
        </Backdrop>
      )}
    </div>
  );
}

export default ItemDetail;
