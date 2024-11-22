"use client";
import { Button } from "@/components/ui/button";
import { updateProduct } from "@/lib/server/actions";
import { Product } from "@/lib/types";
import { cn, formatPrice } from "@/lib/utils";
import { addToCart } from "@/stores/cartReducer";
import { Pen, ShoppingCart } from "lucide-react";
import Form from "next/form";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ComponentProps, useActionState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import LikeButton from "./LikeButton";
import { motion } from "./motion";
import Ratings from "./Ratings";
import { Input } from "./ui/input";

const ProductDetailsMain = ({ product }: { product: Product }) => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const edit = searchParams.get("edit");
  const [state, action, isLoading] = useActionState(
    async (state: Partial<Product>, formData: FormData) => {
      try {
        const res = await updateProduct(state, formData);
        toast.success("Product information is updated successfully");
        return res;
      } catch (e) {
        const err = e as Error;
        switch (err.message) {
          case "NEXT_REDIRECT":
            toast.success("Product information is updated successfully");
            break;
          default:
            console.log(err.message);
            toast.error("Oops!!! Something went wrong");
        }
        return state;
      }
    },
    product
  );

  if (edit) {
    return (
      <Form
        action={action}
        className="grid gap-2 md:max-w-[50vw] md:gap-5 border rounded-md my-2 md:my-10 p-2 md:p-10 m-auto"
      >
        <input hidden defaultValue={state.id} name="id" />
        <FormInput
          label="Product Name"
          name="title"
          defaultValue={state.title}
          required
        />
        <FormInput
          label="Category"
          name="category"
          defaultValue={state.category}
          required
        />
        <FormInput
          label="Brand"
          name="brand"
          defaultValue={state.brand}
          required
        />
        <FormInput
          label="Description"
          name="description"
          defaultValue={state.description}
          required
        />
        <div className="grid grid-cols-2 gap-2">
          <FormInput
            label="Price"
            name="price"
            type="number"
            defaultValue={state.price}
            required
          />
          <FormInput
            label="MRP"
            name="mrp"
            type="number"
            defaultValue={state.mrp}
            required
          />
        </div>
        <Button type="submit" className={cn(isLoading && "opacity-60")}>
          Save
        </Button>
      </Form>
    );
  }

  return (
    <>
      <section className="container mx-auto px-4 py-16 z-10 relative rounded-xl">
        <div className="flex flex-col-reverse md:flex-row *:flex-1 *:flex-shrink-0 gap-12 items-center">
          <div className="space-y-2 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-4">{product.title}</h2>
              <p className="text-primary/60">{product.description}</p>
            </motion.div>

            <div className="flex items-center space-x-4">
              <Ratings value={product.ratings} />
              <span className="text-sm text-gray-400">(42 reviews)</span>
            </div>

            <div className="text-3xl font-bold">
              {formatPrice(product.price)}{" "}
              <span className="line-through text-primary/60">
                {formatPrice(product.mrp)}
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Choose Your Color</h3>
              <div className="flex space-x-4">
                {["Red", "Blue", "Green"].map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${
                      color === "Red"
                        ? "bg-red-500 border-red-300"
                        : color === "Blue"
                        ? "bg-blue-500 border-blue-300"
                        : "bg-green-500 border-green-300"
                    }`}
                    aria-label={`Select ${color} dimension`}
                  />
                ))}
              </div>
            </div>

            <div className="flex space-x-4 items-center">
              <Button variant="success">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy Now
              </Button>
              <Button
                variant="success"
                onClick={() => {
                  dispatch(addToCart(product));
                }}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <LikeButton
                product={product}
                className="border border-current p-2 rounded-md size-9"
              />
            </div>
          </div>

          <Image
            src={product.image}
            alt={product.title}
            width={600}
            height={600}
            className="relative z-10 mx-auto object-contain"
          />
        </div>
      </section>
      <div className="fixed bottom-2 right-2 md:bottom-10 md:right-24 z-20">
        <Link href="?edit=true">
          <Button>
            {" "}
            <Pen /> Edit
          </Button>
        </Link>
      </div>
    </>
  );
};

export default ProductDetailsMain;

const FormInput = ({
  label,
  ...props
}: { label: string } & ComponentProps<typeof Input>) => {
  return (
    <label>
      <div className="text-sm font-semibold text-primary/60">{label}</div>
      <Input {...props} />
    </label>
  );
};
