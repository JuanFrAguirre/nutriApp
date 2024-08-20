'use client';

import { deleteDishById } from '@/actions';
import { useConfirmationStore } from '@/store/confirmation-store';
import { useLoadingStore } from '@/store/global-loading-store';
import { LiaTrashAlt } from 'react-icons/lia';

interface Props {
  id: string;
}

export const DeleteDishButton = ({ id }: Props) => {
  const { setIsLoading } = useLoadingStore();
  const { openConfirmation } = useConfirmationStore();

  const confirmDelete = () => {
    openConfirmation(
      'Eliminar esta comida?',
      async () => {
        setIsLoading(true);
        await deleteDishById(id);
        setIsLoading(false);
        window.location.href = '/dishes';
      },
      false,
    );
  };

  return (
    <button
      className="flex items-center justify-center p-1 mr-4 btn-danger md:px-3"
      onClick={confirmDelete}
      type="button"
    >
      <LiaTrashAlt size={30} />
      <p className="ml-2 max-md:hidden">Eliminar comida</p>
    </button>
  );
};
