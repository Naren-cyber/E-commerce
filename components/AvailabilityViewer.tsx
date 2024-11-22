export default function AvailabilityViewer({
  sold,
  available,
}: {
  sold: number;
  available: number;
}) {
  return (
    <div className="space-y-3 mt-2">
      <div className="flex items-center justify-between text-sm uppercase">
        <div>
          Already Sold: <span className="font-semibold">{sold}</span>
        </div>
        <div>
          Available: <span className="font-semibold">{available}</span>
        </div>
      </div>
      <div className="bg-secondary h-3 rounded-full relative">
        <div
          className="absolute left-1 top-1/2 -translate-y-1/2 bg-green-700 h-1"
          style={{ width: `${(sold * 100) / (sold + available)}%` }}
        />
      </div>
    </div>
  );
}
