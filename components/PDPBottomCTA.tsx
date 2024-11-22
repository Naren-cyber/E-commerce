import { ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { Product } from "@/lib/types";

const CTA = ({ product }: { product: Product }) => (
  <section className="bg-secondary py-16">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-4xl font-bold mb-4">Ready to Buy?</h2>
      <p className="text-xl mb-8">
        Join the trend and order your {product.title} today!
      </p>
      <Button size="lg" className="bg-white text-green-900 hover:bg-gray-100">
        Buy Now
        <ChevronRight className="ml-2" />
      </Button>
    </div>
  </section>
);

export default CTA;
