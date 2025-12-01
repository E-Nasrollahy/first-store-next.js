"use client";
import NumberStepper from "@/components/NumberStepper";
import { useFeachById } from "@/Hook/useFeachById";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";

type IProductIdProps = {
  params: Promise<{ id: string }>;
};

const ProductId = ({ params }: IProductIdProps) => {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    const getId = async () => {
      const { id } = await params;
      setId(id);
    };
    getId();
  }, [params]);

  const { data, error, isLoading } = useFeachById(id ?? "");

  if (error) {
    return (
      <p className="font-bold text-xl text-red-500">Something went wrong !!! {error.message}</p>
    );
  }
  return (
    <div className="grid grid-cols-12">
      {isLoading || !data || !id ? (
        <Skeleton />
      ) : (
        <>
          <div className="col-span-3">
            <div className="flex justify-center items-center">
              <div className="w-52 h-52">
                <img
                  src={data.image}
                  alt=""
                  className=" w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>
          <div className="col-span-9">
            <div className="flex flex-col justify-center gap-3 h-full">
              <p className="font-bold">{data.title}</p>
              <p>{data.description}</p>
              <span className="border-gray-400 inline-block self-start  p-1 rounded-md bg-gray-300">
                {data.price} $
              </span>
              <NumberStepper id={id} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductId;
