"use client";

import { useEffect } from "react";

function BuildTimeLog({
  message = "",
  date,
}: {
  message?: string;
  date: Date;
}) {
  useEffect(() => {
    console.info(
      `%c Build time: ${date.toString()}\t${message} `,
      "color: #d4efd4; background: #044b04;"
    );
  }, [date, message]);

  return null;
}
export default BuildTimeLog;
