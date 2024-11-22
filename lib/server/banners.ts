import db from "@/db.json";
import { cacheTag } from "next/dist/server/use-cache/cache-tag";

const list = async () => {
  "use cache";
  cacheTag("banners");
  return db.banners;
};

const bannerService = {
  list,
};

export default bannerService;
