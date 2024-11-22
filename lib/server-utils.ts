import { unstable_cacheLife } from "next/cache";

export const getBuildTime = async () => {
  "use cache";
  unstable_cacheLife("max");
  return new Date();
};
