'use client';

import { deleteProductById } from '@/actions';
import { useConfirmationStore } from '@/store/confirmation-store';
import { useEffect } from 'react';
import { LiaTrashAlt } from 'react-icons/lia';

interface Props {
  id: string;
}

export const DeleteProductButton = ({ id }: Props) => {
  const { openConfirmation } = useConfirmationStore();

  const confirmDelete = () => {
    openConfirmation(
      'Eliminar este producto?',
      async (text) => {
        await deleteProductById(id);
        window.location.href = '/products';
      },
      true,
    );
  };

  // useEffect(() => {
  //   console.log(textValue);
  // }, [textValue]);

  return (
    <button
      className="btn-danger flex items-center mr-4 p-1 md:px-3 justify-center"
      onClick={confirmDelete}
      type="button"
    >
      <LiaTrashAlt size={30} />
      <p className="ml-2 max-md:hidden">Eliminar producto</p>
    </button>
  );
};
