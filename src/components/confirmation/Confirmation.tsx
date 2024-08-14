'use client';
import { useConfirmationStore } from '@/store/confirmation-store';
import clsx from 'clsx';

export const Confirmation = () => {
  const {
    isOpen,
    message,
    onConfirm,
    closeConfirmation,
    textValue,
    showText,
    setTextValue,
  } = useConfirmationStore();

  const handleCancel = () => {
    closeConfirmation();
  };

  const handleConfirm = () => {
    onConfirm(textValue);
    closeConfirmation();
  };

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 z-30 w-screen h-screen bg-gradient-to-b to-black/10  from-black/50"></div>
      )}

      {isOpen && (
        <div
          className="fixed top-0 left-0 z-30 w-screen h-screen transition-all fade-in backdrop-filter backdrop-blur-[2px]"
          onClick={handleCancel}
        ></div>
      )}

      <div
        className={clsx(
          'fixed p-5 right-0 max-sm:bottom-0 sm:top-0 left-0 max-sm:w-[80%] max-w-[400px] mx-auto sm:mt-[20%] max-sm:mb-[20%] bg-gradient-to-b from-white to-green-100 z-30 shadow transform transition-all duration-500 overflow-y-auto rounded-xl border border-stone-200',
          {
            '-translate-y-[100vh] max-sm:translate-y-[100vh]': !isOpen,
          },
        )}
      >
        <div className="flex flex-col gap-4 items-center">
          <p>{message}</p>
          {showText ? (
            <input
              type="text"
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              className="input"
              disabled={!isOpen}
              autoFocus
            />
          ) : null}
          <div className="space-x-4">
            <button
              onClick={handleCancel}
              disabled={!isOpen}
              className="disabled:pointer-events-none btn-danger"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              disabled={!isOpen}
              className="disabled:pointer-events-none btn-primary"
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
