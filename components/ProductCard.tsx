import type { Product } from "@/types/ProductType";

const ProductCard = ({id , image , title , description , price}:Product) => {
    return <div className="flex flex-col gap-3 p-4 border border-gray-400 rounded-lg bg-gray-100">
        <div className="flex justify-center items-center">
            <div className="w-52 h-52">
                <img src={image} alt="" className=" w-full h-full object-cover rounded-full" />
            </div>
        </div>
        <div className="flex flex-col justify-center gap-3">
            <p className="font-bold">{title}</p>
            <p>{description}</p>
            <span className="border-gray-400 inline-block self-start  p-1 rounded-md bg-gray-300">{price} $</span>
        </div>
    </div>;
}
 
export default ProductCard;