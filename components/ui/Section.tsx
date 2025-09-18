import { ReactNode } from "react";
import Container from "./Container";

export default function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`section ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}


