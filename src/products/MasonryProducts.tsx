'use client';

import { DishProduct } from '@/interfaces/interfaces';
import { useEffect, useState } from 'react';
import { Product } from './Product';

interface Props {
  products: DishProduct[];
}

export const MasonryProducts = ({ products }: Props) => {
  const [numberOfColumns, setNumberOfColumns] = useState(2);

  useEffect(() => {
    const updateNumberOfColumns = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setNumberOfColumns(4);
      } else if (width >= 768) {
        setNumberOfColumns(3);
      } else {
        setNumberOfColumns(2);
      }
    };
    updateNumberOfColumns();

    window.addEventListener('resize', updateNumberOfColumns);
    return () => window.removeEventListener('resize', updateNumberOfColumns);
  }, []);

  const cols: DishProduct[][] = Array.from(
    { length: numberOfColumns },
    () => [],
  );

  products.forEach((product, i) => {
    return cols[i % cols.length].push(product);
  });

  return (
    <div
      className={`grid grid-cols-${numberOfColumns} max-w-7xl px-4 gap-4 grow w-full`}
    >
      {cols.map((col, i) => (
        <div key={i} className="grid gap-4">
          {col.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      ))}
    </div>
  );
};
