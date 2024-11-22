import BuildTimeLog from "@/components/BuildTime";
import CTA from "@/components/PDPBottomCTA";
import Testimonials from "@/components/PDPTestimonials";
import ProductDetailsMain from "@/components/ProductDetailsMain";
import Features from "@/components/ProductFeatures";
import ProductsSlider from "@/components/ProductsSlider";
import productService from "@/lib/server/products";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ProductPageCached id={id} />;
}

const ProductPageCached = async ({ id }: { id: string }) => {
  "use cache";
  const product = await productService.get(id);
  const related = await productService.related(id);
  const buildTime = new Date();

  if (!product) {
    return (
      <div className="text-xl grid place-items-center h-[80vh]">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <BuildTimeLog date={buildTime} />
      <ProductDetailsMain product={product} />
      <Features />
      <Testimonials />
      <CTA product={product} />
      <ProductsSlider title="You may also like" products={related} />
    </div>
  );
};
