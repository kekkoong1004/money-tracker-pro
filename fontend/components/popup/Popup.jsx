import React from 'react';

function Popup({ query, onConfirm, onCancel }) {
  const confirmHandler = () => {
    onConfirm();
  };

  const cancelHandler = () => {
    onCancel();
  };

  return (
    <div className="w-2/4 h-1/4 absolute top-1/2 left-1/2 bg-red-100 flex justify-center items-center flex-col -translate-x-[50%] -translate-y-[50%] rounded-lg shadow-2xl z-200">
      <h1 className="text-xl">Are you sure to delete item?</h1>
      <div className="mt-8 flex justify-around w-full">
        <button
          className="w-1/4 px-2 py-1 bg-slate-600 rounded-sm text-white"
          type="button"
          onClick={cancelHandler}
        >
          Cancel
        </button>
        <button
          className="w-1/4 px-2 py-1 bg-slate-600 rounded-sm text-white"
          type="button"
          onClick={confirmHandler}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default Popup;
