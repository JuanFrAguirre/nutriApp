export default async function DishesPage() {
  // const dishes = await getDishes();

  return (
    <main className="flex grow justify-center items-center flex-col gap-10 mb-32 mt-10">
      <h1 className="text-3xl font-semibold text-secondary">Tus registros</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 justify-between max-w-7xl max-sm:px-2 px-4 w-full">
        {/* {dishes.map((dish) => (
          <Dish key={dish.id} dish={dish} className="basis-[49%]" />
        ))} */}
      </div>
      <div className="grow"></div>
    </main>
  );
}
