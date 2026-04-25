"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";
import type { EstadoMap } from "./EstadoMap";

// Leaflet manipulates `window` and `document` — must not render on the server
const EstadoMapNoSSR = dynamic(
  () => import("./EstadoMap").then((m) => m.EstadoMap),
  { ssr: false },
);

export type EstadoMapProps = ComponentProps<typeof EstadoMap>;

export function EstadoMapDynamic(props: EstadoMapProps) {
  return <EstadoMapNoSSR {...props} />;
}
