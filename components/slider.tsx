"use client";
import { useState } from "react";
import { Input } from "./ui/input";

export default function Slider({
  min,
  max,
  onChange,
}: {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}) {
  const [value, setValue] = useState([min, max]);

  return (
    <div className="grid gap-2 grid-cols-2">
      <label>
        <span className="text-primary/60 tracking-wider font-semibold text-xs">
          Min
        </span>
        <Input
          placeholder="Min Price"
          onChange={(e) => {
            const newValue = [+e.target.value, value[1]];
            setValue(newValue);
            onChange(newValue[0], newValue[1]);
          }}
          type="number"
          defaultValue={value[0]}
        />
      </label>
      <label>
        <span className="text-primary/60 tracking-wider font-semibold text-xs">
          Max
        </span>
        <Input
          placeholder="Max Price"
          onChange={(e) => {
            const newValue = [value[0], +e.target.value];
            setValue(newValue);
            onChange(newValue[0], newValue[1]);
          }}
          type="number"
          defaultValue={value[1]}
        />
      </label>
    </div>
  );
}
