import { getProductById } from '@/actions';
import { DeleteProductButton } from '@/products';
import { EditProductForm } from '@/products/EditProductForm';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoArrowBackOutline } from 'react-icons/io5';

interface Props {
  params: {
    id: string;
  };
}

export default async function ProductByIdPage({ params }: Props) {
  const { id } = params;
  const product = await getProductById(id);

  if (!product) redirect('/products');

  return (
    <main className="flex grow justify-center items-center flex-col gap-10 mb-32 mt-10">
      <div className="w-full space-y-2 max-w-7xl mx-auto">
        <div className="flex justify-between">
          <Link
            href={'/products'}
            className="flex items-center gap-2 ml-4 hover:underline"
          >
            <IoArrowBackOutline />
            Productos
          </Link>
          <DeleteProductButton id={product.id!} />
        </div>
        <h1 className="text-3xl font-semibold text-secondary text-center">
          {product.title}
        </h1>
      </div>
      <EditProductForm product={product} />
    </main>
  );
}
