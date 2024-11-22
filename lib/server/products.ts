import { expireTag } from "next/cache";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";
import config from "../config";
import { Product, SearchParams, SortOptionValue } from "../types";

const list = async (
  limit: number = 12,
  filter: SearchParams = {}
): Promise<Product[]> => {
  "use cache";
  const searchParams = new URLSearchParams();
  for (const field in filter) {
    for (const value of filter[field].split(",")) {
      searchParams.append(field, value);
    }
  }
  cacheTag("products", searchParams.toString());
  const res = await fetch(`${config.jsonDataApi}/products?${searchParams}`);
  const data = (await res.json()) as Product[];
  if (filter.sort) {
    switch (filter.sort as SortOptionValue) {
      case "price-asc": {
        data.sort((a, b) => a.price - b.price);
        break;
      }
      case "price-desc": {
        data.sort((a, b) => b.price - a.price);
        break;
      }
    }
  }
  return data.slice(0, limit);
};

const get = async (id: string): Promise<Product | undefined> => {
  "use cache";
  cacheTag(`product-${id}`);
  const res = await fetch(`${config.jsonDataApi}/products/${id}`);
  return res.json();
};

const update = async (id: string, product: Partial<Product>) => {
  const res = await fetch(`${config.jsonDataApi}/products/${id}`, {
    method: "PUT",
    body: JSON.stringify(product),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  const data = await res.json();
  expireTag(`products`);
  expireTag(`product-${id}`);
  return product;
};

const related = async (id: string) => {
  "use cache";
  cacheTag(`product-${id}`);
  const products = await list();
  return products.filter((p) => p.id !== id).slice(0, 6);
};

const categories = async () => {
  "use cache";
  cacheTag("categories");
  const products = await list();
  const values = new Set(products.map((p) => p.category));
  return [...values].map((p) => ({
    label: p,
    icon: products.find((prod) => prod.category === p)!.image,
    href: `/products?category=${p}`,
  }));
};

const productService = {
  list,
  get,
  update,
  related,
  categories,
};

export default productService;
