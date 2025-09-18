import { ReactNode } from "react";

export default function Split({
  left,
  right,
  reverse = false,
}: {
  left: ReactNode;
  right: ReactNode;
  reverse?: boolean;
}) {
  return (
    <div className={`grid md:grid-cols-2 gap-10 items-start ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
      <div>{left}</div>
      <div>{right}</div>
    </div>
  );
}


