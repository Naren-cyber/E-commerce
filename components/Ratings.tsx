import { StarHalfIcon, StarIcon } from "lucide-react";

export default function Ratings({ value }: { value: number }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => {
        if (i + 0.5 < value) {
          return (
            <StarIcon
              key={i}
              size={14}
              className="fill-yellow-300 text-yellow-300"
            />
          );
        }

        if (i < value) {
          return (
            <StarHalfIcon
              key={i}
              size={14}
              className="fill-yellow-300 text-yellow-300"
            />
          );
        }

        return <StarIcon key={i} size={14} className="text-yellow-300" />;
      })}
    </div>
  );
}
