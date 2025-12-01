"use client"
import { useRouter } from "next/navigation";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount }: { pageCount: number }) => {
    const router = useRouter();

    const handlePageClick = (event: { selected: number }) => {
        router.push(`/stor?page=${event.selected + 1}`);
    }

    return     <>
      <div className="flex justify-center items-center w-full my-10">
        <ReactPaginate
        className="flex justify-center items-center gap-6 px-3 py-1 rounded-lg bg-gray-200 [&>li]:cursor-pointer [&>li.selected]:bg-gray-400 [&>li.selected]:px-3 [&>li.selected]:rounded-full [&>li.selected]:py-2 list-none"
        breakLabel="..."
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount ?? 1}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
      </div>
    </>;
}
 
export default Pagination;