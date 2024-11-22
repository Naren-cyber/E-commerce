"use client";
import useMounted from "@/hooks/useMounted";
import { getTimeDifference } from "@/lib/utils";

export default function Expiry({ expiry }: { expiry: Date | string }) {
  const mounted = useMounted();

  if (!mounted) {
    return null;
  }

  const { days, hours, mins, secs } = getTimeDifference(expiry);

  const Item = ({
    value,
    label,
  }: {
    value: string | number;
    label: string;
  }) => (
    <div className="md:w-20 rounded-lg bg-secondary grid place-items-center p-3">
      <strong className="text-xl">{value}</strong>
      <span className="text-xs">{label}</span>
    </div>
  );

  return (
    <div>
      <div className="font-semibold uppercase text-xs mt-3">
        Hurry Up! Offer ends in:
      </div>
      <div className="mt-2 md:flex grid grid-cols-4 gap-3">
        <Item label="Days" value={days} />
        <Item label="Hours" value={hours} />
        <Item label="Min" value={mins} />
        <Item label="Sec" value={secs} />
      </div>
    </div>
  );
}
