"use server";

import { expirePath } from "next/cache";
import { headers } from "next/headers";
import { Product } from "../types";
import productService from "./products";
import { z } from "zod";
import { redirect } from "next/navigation";
export const refreshPath = async () => {
  const headerStore = await headers();
  const href = headerStore.get("referer");
  if (href) {
    const path = new URL(href).pathname;
    expirePath(path);
  }
};

const productSchema = z.object({
  id: z.string(),
  title: z.string().min(1).optional(),
  description: z.string().min(10).optional(),
  price: z.coerce.number().optional(),
  mrp: z.coerce.number().optional(),
  category: z.string().optional(),
  brand: z.string().optional(),
  image: z.string().optional(),
  gender: z.enum(["men", "women", "unisex"]).optional(),
});
export const updateProduct = async (
  _: Partial<Product>,
  formData: FormData
) => {
  const product = productSchema.parse(Object.fromEntries(formData.entries()));
  await productService.update(product.id, product);
  redirect(`/products/${product.id}`);
};
