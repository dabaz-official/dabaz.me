import type { ReactNode } from "react";

import { cn } from "@dabaz/lib/utils";

type ContainerProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

export default function Container({ id, className, children }: ContainerProps) {
  return (
    <div id={id} className={cn("mx-auto w-full max-w-6xl px-6", className)}>
      {children}
    </div>
  );
}
