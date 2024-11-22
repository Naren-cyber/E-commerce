"use client";

import { useSelector } from "@/stores/ReduxProvider";
import Image from "next/image";
import { Button } from "./ui/button";
import { formatPrice } from "@/lib/utils";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { ShoppingBagIcon, Trash } from "lucide-react";
import { Separator } from "./ui/separator";
import ActionTooltip from "./ActionTooltip";
import { useDispatch } from "react-redux";
import { removeFromCart } from "@/stores/cartReducer";

function CartSidebar() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce((p, c) => p + c.price * c.quantity, 0);
  const totalMRP = cartItems.reduce((p, c) => p + c.mrp * c.quantity, 0);
  const totalSaving = totalMRP - totalPrice;
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex-1">
        <div className="p-2 grid gap-2">
          {cartItems.map((p) => (
            <div
              key={p.id}
              className="p-2 shadow bg-secondary flex gap-2 items-center"
            >
              <Image
                src={p.image}
                alt={p.title}
                height={75}
                width={75}
                className="object-contain"
              />
              <div className="space-y-1 flex-grow">
                <div>{p.title}</div>
                <div className="flex justify-between items-center">
                  <div>{p.quantity}</div>
                  <ActionTooltip title={`Remove ${p.title} from the cart`}>
                    <Trash
                      size={14}
                      onClick={() => dispatch(removeFromCart(p))}
                    />
                  </ActionTooltip>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-2 border-t flex items-center justify-between">
        <div className="text-sm  font-semibold">
          <div>Total Amount: {formatPrice(totalPrice)}</div>
          <div className="text-green-500">
            Total Saving: {formatPrice(totalSaving)}
          </div>
        </div>
        <Button className="uppercase tracking-wider">Buy now</Button>
      </div>
    </div>
  );
}

export default function Cart() {
  const qty = useSelector((p) => p.cart.items.length);
  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative">
          <ShoppingBagIcon />
          {!!qty && (
            <div className="absolute bg-red-600 px-1 rounded-full text-white text-xs -right-2 -top-2">
              {qty}
            </div>
          )}
        </div>
      </SheetTrigger>
      <SheetContent className="p-0 flex flex-col">
        <SheetTitle>
          <div className="p-3 flex items-center gap-3">
            <ShoppingBagIcon /> My Shopping Cart
          </div>
          <Separator />
        </SheetTitle>
        <CartSidebar />
      </SheetContent>
    </Sheet>
  );
}
