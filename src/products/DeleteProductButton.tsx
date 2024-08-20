'use client';

import { deleteProductById } from '@/actions';
import { useConfirmationStore } from '@/store/confirmation-store';
import { useLoadingStore } from '@/store/global-loading-store';
import { LiaTrashAlt } from 'react-icons/lia';

interface Props {
  id: string;
}

export const DeleteProductButton = ({ id }: Props) => {
  const { openConfirmation } = useConfirmationStore();
  const { setIsLoading } = useLoadingStore();

  const confirmDelete = () => {
    openConfirmation(
      'Eliminar este producto?',
      async (text) => {
        setIsLoading(true);
        await deleteProductById(id);
        setIsLoading(false);
        window.location.href = '/products';
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
      <p className="ml-2 max-md:hidden">Eliminar producto</p>
    </button>
  );
};
