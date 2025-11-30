export interface Product {
	id: number;
	image: string;
	title: string;
	description: string;
	price: number;
}
export interface DataListProduct {
	first: number | null,
	prev: number | null,
	next: number | null,
	last: number | null,
	pages: number ,
	items: number | null,
	data: Product[]
}