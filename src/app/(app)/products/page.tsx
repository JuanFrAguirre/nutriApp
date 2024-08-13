import { getProducts } from '@/actions';
import { Product } from '@/products';
import { MasonryProducts } from '@/products/MasonryProducts';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="flex grow justify-center items-center flex-col gap-10 mb-32 mt-10">
      <h1 className="text-3xl font-semibold text-secondary">Productos</h1>
      {/* <MasonryProducts products={products} /> */}
      <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-7xl max-sm:px-2 px-4 gap-4 grow w-full`}
      >
        {products.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </main>
  );
}
