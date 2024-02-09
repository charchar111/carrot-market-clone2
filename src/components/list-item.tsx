import { ProductSelect } from "@/pages";
import Link from "next/link";

export interface ListItemProps {
  product: ProductSelect;
}

export default function ListItem({ product }: ListItemProps) {
  return (
    <div className=" row flex justify-between border-b-2 p-4 py-8">
      <Link href={`/products/${product.id}`}>
        <div className="row__column1 flex cursor-pointer items-center space-x-2">
          <div className="img-wrapper aspect-square w-20 rounded-lg bg-gray-400" />
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-600">{product.name}</h3>
            <span className="mb-2 text-xs text-gray-400">
              {product.createdAt.toString()}
            </span>
            <span className="font-semibold">{product.price}</span>
          </div>
        </div>
      </Link>

      <div className="row__column2 flex items-end space-x-5">
        <div className="column2__icon1 flex items-center space-x-1 text-gray-500 ">
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
          <span>{product._count.Records}</span>
        </div>
      </div>
    </div>
  );
}
