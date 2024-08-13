import { CreateProductForm } from '@/products';
import Link from 'next/link';
import { IoArrowBackOutline } from 'react-icons/io5';

export default function NewProductPage() {
  return (
    <main className="flex grow justify-center items-center flex-col gap-10 mb-32 mt-10">
      <div className="w-full space-y-2 max-w-7xl mx-auto">
        <div className="flex">
          <Link
            href={'/products'}
            className="flex items-center gap-2 ml-4 hover:underline"
          >
            <IoArrowBackOutline />
            Productos
          </Link>
        </div>
        <h1 className="text-3xl font-semibold text-secondary text-center">
          Agregar un producto
        </h1>
      </div>
      <CreateProductForm />
    </main>
  );
}
