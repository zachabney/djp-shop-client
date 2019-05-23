export interface Product {
	id: number;
	title: string;
	year: number;
	description: string;
	briefDescription: string;
	price: number;
	preorder: boolean;
	owned?: boolean;
	download?: { url: string; expireTime: number };
}
