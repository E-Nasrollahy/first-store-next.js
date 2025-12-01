"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { useState } from "react";
import { Input } from "./ui/input";

const Search = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [search, setSearch] = useState("");

  const handleOnClick = () => {
    const value = search?.trim();
    if (!value) return;
    const currentSearchParams = new URLSearchParams(searchParams.toString());
    currentSearchParams.set("title", value);
    router.push(`/stor?${currentSearchParams.toString()}`);
  };

  return (
    <div className="flex items-center gap-4 my-5">
      <Input
        type="text"
        className="bg-zinc-200 rounded-lg border-0 min-w-80 p-2 w-full"
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button onClick={handleOnClick}>Discount Code</Button>
    </div>
  );
};

export default Search;
