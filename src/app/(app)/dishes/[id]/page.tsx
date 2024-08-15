import { getDishById } from '@/actions';
import { DeleteDishButton } from '@/products/DeleteDIshButton';
import {
  customRound,
  DEFAULT_IMAGE,
  renderSelectedNutritionalValueFromDish,
  renderSelectedNutritionalValueFromProductDish,
} from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { IoArrowBackOutline } from 'react-icons/io5';

interface Props {
  params: {
    id: string;
  };
}

export default async function DishByIdPage({ params }: Props) {
  const { id } = params;
  const dish = await getDishById(id);

  if (!dish) redirect('/dishes');

  return (
    <main className="flex grow justify-center items-center flex-col gap-10 mb-32 mt-10">
      <div className="w-full space-y-2 max-w-7xl mx-auto">
        <div className="flex justify-between">
          <Link
            href={'/dishes'}
            className="flex items-center gap-2 ml-4 hover:underline"
          >
            <IoArrowBackOutline />
            Comidas
          </Link>
          <DeleteDishButton id={dish.id!} />
        </div>
        <h1 className="text-3xl font-semibold text-secondary text-center">
          {dish.title}
        </h1>
      </div>

      <div className="space-y-4 px-4">
        <p className="text-lg sm:text-xl font-semibold text-center">Resumen</p>
        <div className="p-4 bg-white border shadow border-stone-100 rounded-xl">
          {/* Nutritional section */}
          <div>
            <div className="flex justify-between items-center">
              <p>Calorías totales </p>
              <span className="border-b mx-2 mb-1.5 border-stone-200 grow min-w-2 self-stretch" />
              <p className="text-secondary font-medium">
                {renderSelectedNutritionalValueFromDish('calories', dish)}kcal
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p>Proteínas totales </p>
              <span className="border-b mx-2 mb-1.5 border-stone-200 grow min-w-2 self-stretch" />
              <p className="text-secondary font-medium">
                {renderSelectedNutritionalValueFromDish('proteins', dish)}g
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p>Carbohidratos totales </p>
              <span className="border-b mx-2 mb-1.5 border-stone-200 grow min-w-2 self-stretch" />
              <p className="text-secondary font-medium">
                {renderSelectedNutritionalValueFromDish('carbohydrates', dish)}g
              </p>
            </div>
            <div className="flex justify-between items-center">
              <p>Grasas totales </p>
              <span className="border-b mx-2 mb-1.5 border-stone-200 grow min-w-2 self-stretch" />
              <p className="text-secondary font-medium">
                {renderSelectedNutritionalValueFromDish('fats', dish)}g
              </p>
            </div>
          </div>

          {/* Miscellaneous section */}
          <div></div>
        </div>
      </div>

      <div className="space-y-4 px-4">
        <p className="text-lg sm:text-xl font-semibold text-center">
          Productos
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {dish.Dish_Product.map((dishProduct) => (
            <div
              key={dishProduct.id}
              className="py-4 bg-white border shadow border-stone-100 rounded-xl"
            >
              <p className="font-semibold text-center mb-4 pb-2 border-b text-secondary">
                {dishProduct.product.title}
              </p>
              <div className="flex items-center justify-between gap-4 px-4">
                <div className="max-w-[300px] basis-1/3 ">
                  <Image
                    width={500}
                    height={500}
                    alt={dishProduct.product.title}
                    src={dishProduct.product.image || DEFAULT_IMAGE}
                    className="border-stone-100 rounded-xl border shadow"
                  />
                </div>

                <div className="max-w-[60%]">
                  <div className="flex justify-between items-center">
                    <p>Cantidad / Peso</p>
                    <span className="border-b mx-2 mb-1.5 border-stone-200 grow min-w-2 self-stretch" />
                    <p className="text-secondary font-medium">
                      {customRound(dishProduct.portionWeight)}g
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Calorías</p>
                    <span className="border-b mx-2 mb-1.5 border-stone-200 grow min-w-2 self-stretch" />
                    <p className="text-secondary font-medium">
                      {renderSelectedNutritionalValueFromProductDish(
                        'calories',
                        dishProduct,
                      )}
                      kcal
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Proteínas</p>
                    <span className="border-b mx-2 mb-1.5 border-stone-200 grow min-w-2 self-stretch" />
                    <p className="text-secondary font-medium">
                      {renderSelectedNutritionalValueFromProductDish(
                        'proteins',
                        dishProduct,
                      )}
                      g
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Carbohidratos </p>
                    <span className="border-b mx-2 mb-1.5 border-stone-200 grow min-w-2 self-stretch" />
                    <p className="text-secondary font-medium">
                      {renderSelectedNutritionalValueFromProductDish(
                        'carbohydrates',
                        dishProduct,
                      )}
                      g
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p>Grasas </p>
                    <span className="border-b mx-2 mb-1.5 border-stone-200 grow min-w-2 self-stretch" />
                    <p className="text-secondary font-medium">
                      {renderSelectedNutritionalValueFromProductDish(
                        'fats',
                        dishProduct,
                      )}
                      g
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
