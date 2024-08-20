import { getProducts } from '@/actions';
import { DishProduct } from '@/interfaces/interfaces';
import { Product } from '@/products';
import { MasonryProducts } from '@/products/MasonryProducts';
import Link from 'next/link';

export default async function ProductsPage() {
  const products = await getProducts();

  const twoCols = () => {
    const cols: { first: DishProduct[]; second: DishProduct[] } = {
      first: [],
      second: [],
    };
    products.forEach((item, i) => {
      if (i % 2 === 0) cols.first.push(item);
      if (i % 2 === 1) cols.second.push(item);
    });
    return cols;
  };
  const threeCols = () => {
    const cols: {
      first: DishProduct[];
      second: DishProduct[];
      third: DishProduct[];
    } = {
      first: [],
      second: [],
      third: [],
    };
    products.forEach((item, i) => {
      if (i % 3 === 0) cols.first.push(item);
      if (i % 3 === 1) cols.second.push(item);
      if (i % 3 === 2) cols.third.push(item);
    });
    return cols;
  };
  const fourCols = () => {
    const cols: {
      first: DishProduct[];
      second: DishProduct[];
      third: DishProduct[];
      fourth: DishProduct[];
    } = {
      first: [],
      second: [],
      third: [],
      fourth: [],
    };
    products.forEach((item, i) => {
      if (i % 4 === 0) cols.first.push(item);
      if (i % 4 === 1) cols.second.push(item);
      if (i % 4 === 2) cols.third.push(item);
      if (i % 4 === 3) cols.fourth.push(item);
    });
    return cols;
  };
  const fiveCols = () => {
    const cols: {
      first: DishProduct[];
      second: DishProduct[];
      third: DishProduct[];
      fourth: DishProduct[];
      fifth: DishProduct[];
    } = {
      first: [],
      second: [],
      third: [],
      fourth: [],
      fifth: [],
    };
    products.forEach((item, i) => {
      if (i % 5 === 0) cols.first.push(item);
      if (i % 5 === 1) cols.second.push(item);
      if (i % 5 === 2) cols.third.push(item);
      if (i % 5 === 3) cols.fourth.push(item);
      if (i % 5 === 4) cols.fifth.push(item);
    });
    return cols;
  };

  return (
    <main className="flex flex-col items-center justify-center gap-10 mx-auto mt-10 mb-32 grow max-w-7xl">
      <h1 className="text-3xl font-semibold text-secondary">Productos</h1>
      {!!products.length ? (
        <>
          {/* SM */}
          <div className="grid items-start w-full grid-cols-2 gap-4 px-2 sm:hidden">
            <div className="grid items-start gap-4">
              {twoCols().first.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
            <div className="grid items-start gap-4">
              {twoCols().second.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* MD */}
          <div className="grid items-start w-full grid-cols-3 gap-4 px-2 max-sm:hidden md:hidden">
            <div className="grid items-start gap-4">
              {threeCols().first.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
            <div className="grid items-start gap-4">
              {threeCols().second.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
            <div className="grid items-start gap-4">
              {threeCols().third.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* LG */}
          <div className="grid items-start w-full grid-cols-4 gap-4 px-2 max-md:hidden xl:hidden">
            <div className="grid items-start gap-4">
              {fourCols().first.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
            <div className="grid items-start gap-4">
              {fourCols().second.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
            <div className="grid items-start gap-4">
              {fourCols().third.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
            <div className="grid items-start gap-4">
              {fourCols().fourth.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* XL */}
          <div className="grid items-start w-full grid-cols-5 gap-4 px-2 max-xl:hidden">
            <div className="grid items-start gap-4">
              {fiveCols().first.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
            <div className="grid items-start gap-4">
              {fiveCols().second.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
            <div className="grid items-start gap-4">
              {fiveCols().third.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
            <div className="grid items-start gap-4">
              {fiveCols().fourth.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
            <div className="grid items-start gap-4">
              {fiveCols().fifth.map((product) => (
                <Product key={product.id} product={product} />
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-10 p-4 grow">
          <p className="text-lg font-light text-center">
            Aún no hay comidas agregadas. Crea alguna para comenzar a trackear
            tu día a día.
          </p>
          <Link href={'/products/new'} className="btn">
            Crear una comida
          </Link>
        </div>
      )}
    </main>
  );
}
