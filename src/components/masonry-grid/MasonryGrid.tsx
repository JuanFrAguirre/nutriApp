interface Props {
  array: any[];
  renderable: React.ReactNode;
}

export function MasonryGrid({ array, renderable }: Props) {
  const firstCol = array.filter((_, index) => index % 3 === 0);
  const secondCol = array.filter((_, index) => index % 3 === 1);
  const thirdCol = array.filter((_, index) => index % 3 === 2);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      <div>{firstCol.map((item) => renderable)}</div>
      <div>{firstCol.map((item) => renderable)}</div>
      <div>{firstCol.map((item) => renderable)}</div>
    </div>
  );
}
