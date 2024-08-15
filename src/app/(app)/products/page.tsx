import { getProducts } from '@/actions';
import { DishProduct } from '@/interfaces/interfaces';
import { Product } from '@/products';
import { MasonryProducts } from '@/products/MasonryProducts';

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
    <main className="flex grow justify-center items-center flex-col gap-10 mb-32 mt-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-semibold text-secondary">Productos</h1>
      {/* <MasonryProducts products={products} /> */}
      {/* <div
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 max-w-7xl max-sm:px-2 px-4 gap-4 grow w-full`}
      >
        {products.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div> */}
      {/* SM */}
      <div className="grid grid-cols-2 sm:hidden px-2 w-full gap-4 items-start">
        <div className="grid gap-4 items-start">
          {twoCols().first.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <div className="grid gap-4 items-start">
          {twoCols().second.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* MD */}
      <div className="grid grid-cols-3 max-sm:hidden md:hidden px-2 w-full gap-4 items-start">
        <div className="grid gap-4 items-start">
          {threeCols().first.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <div className="grid gap-4 items-start">
          {threeCols().second.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <div className="grid gap-4 items-start">
          {threeCols().third.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* LG */}
      <div className="grid grid-cols-4 max-md:hidden xl:hidden px-2 w-full gap-4 items-start">
        <div className="grid gap-4 items-start">
          {fourCols().first.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <div className="grid gap-4 items-start">
          {fourCols().second.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <div className="grid gap-4 items-start">
          {fourCols().third.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <div className="grid gap-4 items-start">
          {fourCols().fourth.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* XL */}
      <div className="grid grid-cols-5 max-xl:hidden px-2 w-full gap-4 items-start">
        <div className="grid gap-4 items-start">
          {fiveCols().first.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <div className="grid gap-4 items-start">
          {fiveCols().second.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <div className="grid gap-4 items-start">
          {fiveCols().third.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <div className="grid gap-4 items-start">
          {fiveCols().fourth.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
        <div className="grid gap-4 items-start">
          {fiveCols().fifth.map((product) => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
