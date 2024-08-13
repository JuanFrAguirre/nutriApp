import { getDishes } from '@/actions';
import { MasonryGrid } from '@/components';
import { Dish } from '@/dishes';

export default async function DishesPage() {
  const dishes = await getDishes();

  return (
    <main className="flex grow justify-center items-center flex-col gap-10 mb-32 mt-10">
      <h1 className="text-3xl font-semibold text-secondary">Tus comidas</h1>
      <div className="flex flex-wrap justify-between items-start max-w-7xl max-sm:px-2 px-4 w-full">
        {dishes.map((dish) => (
          <Dish key={dish.id} dish={dish} className="basis-[49%]" />
        ))}
      </div>
      {/* <MasonryGrid array={dishes} renderable={<p>BLOCK</p>} /> */}
      <div className="grow"></div>
    </main>
  );
}
