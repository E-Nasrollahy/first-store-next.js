import ProductCard from "@/components/ProductCard";
import type { Product, DataListProduct } from "@/types/ProductType";
import Link from "next/link";
import { getPaginationAllProducts } from "@/services/ProductsServices";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";
import { UrlType } from "@/types/UrlType";

interface IPropsStor{
  params: Promise<{slug:string}>,
  searchParams:Promise<UrlType>
}

const Stor = async ({ searchParams}:IPropsStor) => {

  const searchParamsResolved = await searchParams;
  const page = searchParamsResolved.page || "1";
  const per_page = searchParamsResolved.per_page || "3";
  const title = searchParamsResolved.title || "";

  const data: DataListProduct = await getPaginationAllProducts({page,per_page,title});

  return (
    <>
    <Search />
    <div className="grid grid-cols-3 gap-3">
      {data?.data.map((item: Product) => (
        <Link href={`/stor/${item.id}`} key={item.id}>
          <ProductCard {...item} />
        </Link>
      ))}
    </div>
    <Pagination pageCount={data.pages}/>
    </>
  );
};

export default Stor;
