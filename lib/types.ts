import { ReactNode } from "react";
import config from "./config";

export type MaybePromise<T> = Promise<T> | T;

export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  brand: string;
  gender: "men" | "women" | "unisex";
  mrp: number;
  price: number;
  image: string;
  ratings: number;
}

export interface ProductGroupProps<T extends "awaited" | null = null> {
  title?: string;
  products: T extends "awaited" ? Product[] : MaybePromise<Product[]>;
  actions?: ReactNode;
}

export type SearchParams = Record<string, string>;

export type SortOption = (typeof config.sortOptions)[number];

export type SortOptionValue = SortOption["value"];
