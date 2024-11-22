import { Skeleton } from "@/components/ui/skeleton";

export default function ProductPageSkeleton() {
  return (
    <div>
      <div className="flex flex-col-reverse md:flex-row *:flex-1 gap-2 md:gap-5 px-2 md:px-24">
        <div className="md:py-24 py-5">
          <Skeleton className="h-10 md:h-14 mb-1" />
          <Skeleton className="h-10 md:h-14 w-1/2" />
          <Skeleton className="h-8 my-2" />
          <Skeleton className="md:h-6 w-24 my-5" />
          <Skeleton className="md:h-10 w-32 my-5" />
          <Skeleton className="h-14 w-48 my-5" />
          <Skeleton className="h-12 w-2/3 my-5" />
        </div>
        <div className="p-5 md:p-24">
          <Skeleton className="aspect-square" />
        </div>
      </div>
      <Skeleton className="aspect-[3] py-10 px-2 md:px-24">
        <Skeleton className="mx-auto h-10 w-48 mb-8" />
        <div className="grid md:grid-cols-2 gap-5 md:gap-5">
          <div className="grid place-items-center">
            <div className="mx-auto w-96">
              <Skeleton className="h-24 p-2 mb-3">
                <Skeleton className="w-1/2 h-8" />
              </Skeleton>
              <Skeleton className="h-20" />
            </div>
          </div>
          <div className="grid place-items-center">
            <Skeleton className="aspect-square md:w-72 w-[70vw]" />
          </div>
        </div>
      </Skeleton>
    </div>
  );
}
