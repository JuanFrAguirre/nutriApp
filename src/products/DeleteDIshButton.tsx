'use client';

import { deleteDishById } from '@/actions';
import { useConfirmationStore } from '@/store/confirmation-store';
import { LiaTrashAlt } from 'react-icons/lia';

interface Props {
  id: string;
}

export const DeleteDishButton = ({ id }: Props) => {
  const { openConfirmation } = useConfirmationStore();

  const confirmDelete = () => {
    openConfirmation(
      'Eliminar esta comida?',
      async () => {
        await deleteDishById(id);
        window.location.href = '/dishes';
      },
      false,
    );
  };

  return (
    <button
      className="btn-danger flex items-center mr-4 p-1 md:px-3 justify-center"
      onClick={confirmDelete}
      type="button"
    >
      <LiaTrashAlt size={30} />
      <p className="ml-2 max-md:hidden">Eliminar comida</p>
    </button>
  );
};
