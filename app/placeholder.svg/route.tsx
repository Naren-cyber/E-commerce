import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";

export function GET({ nextUrl: { searchParams } }: NextRequest) {
  const height = +(searchParams.get("height") || 500);
  const width = +(searchParams.get("width") || 500);
  const text = searchParams.get("text") || "";

  return new ImageResponse(
    <div style={{ height, width, background: "gray" }}>{text}</div>,
    {
      height,
      width,
    }
  );
}
