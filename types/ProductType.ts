export interface Product {
	id: string;
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