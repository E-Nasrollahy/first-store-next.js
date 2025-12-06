"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { postNewProduct } from "@/services/ProductsServices";
import { Product } from "@/types/ProductType";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Dashbord = () => {
  const router = useRouter();
  const [newProduct, setNewProduct] = useState<Product>({
    id: "0",
    title: "",
    price: 0,
    image: "",
    description: "",
  });

  const handleChangeProduct = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setNewProduct({
      ...newProduct,
      id: Math.floor(Math.random() * 10000).toString(),
      [name]: value,
    });
  };

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    try {
      const created = await postNewProduct(newProduct);
      router.push("/stor");
      setNewProduct({ id: "0", title: "", price: 0, image: "", description: "" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex justify-center items-center w-full">
      <form className="flex flex-col gap-4 w-1/2 p-4 border rounded-lg bg-zinc-200 shadow">
        <div className="flex flex-col gap-2">
          <Label htmlFor="title">title :</Label>
          <Input
            onChange={handleChangeProduct}
            id="title"
            name="title"
            className="bg-white"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="price">price :</Label>
          <Input
            onChange={handleChangeProduct}
            id="price"
            name="price"
            className="bg-white"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="image">image :</Label>
          <Input
            onChange={handleChangeProduct}
            id="image"
            name="image"
            className="bg-white"
            type="file"
            placeholder="..."
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="description">description :</Label>
          <Textarea
            onChange={handleChangeProduct}
            id="description"
            name="description"
            rows={5}
            className="bg-white "
          />
        </div>
        <Button onClick={(e) => handleClick(e)} className="mt-3 cursor-pointer">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Dashbord;
