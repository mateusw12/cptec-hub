"use client";

import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useMemo } from "react";
import type { FeatureCollection, Feature } from "geojson";
import type { PathOptions, Layer } from "leaflet";

// Fix default marker icon paths broken by webpack
delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface EstadoMapProps {
  geoJson: FeatureCollection;
  /** lookup: código IBGE (codarea) → nome do município */
  nomesPorCodigo?: Record<string, string>;
}

const FILL_COLOR = "#2563EB";
const FILL_HOVER = "#38BDF8";
const BORDER_COLOR = "#0F172A";

const defaultStyle: PathOptions = {
  fillColor: FILL_COLOR,
  fillOpacity: 0.35,
  color: BORDER_COLOR,
  weight: 0.8,
};

const hoverStyle: PathOptions = {
  fillColor: FILL_HOVER,
  fillOpacity: 0.6,
  color: BORDER_COLOR,
  weight: 1.2,
};

export function EstadoMap({ geoJson, nomesPorCodigo = {} }: EstadoMapProps) {
  // Compute bounds from the GeoJSON
  const bounds = useMemo(() => {
    try {
      return L.geoJSON(geoJson).getBounds();
    } catch {
      return undefined;
    }
  }, [geoJson]);

  function onEachFeature(feature: Feature, layer: Layer) {
    const codarea: string = (feature.properties as { codarea?: string })?.codarea ?? "";
    const nome = nomesPorCodigo[codarea] ?? codarea;

    (layer as L.Path).bindTooltip(nome, {
      sticky: true,
      direction: "top",
      className: "ibge-tooltip",
    });

    (layer as L.Path).on({
      mouseover(e) {
        (e.target as L.Path).setStyle(hoverStyle);
        (e.target as L.Path).bringToFront();
      },
      mouseout(e) {
        (e.target as L.Path).setStyle(defaultStyle);
      },
    });
  }

  if (!bounds || !bounds.isValid()) return null;

  return (
    <>
      <style>{`
        .ibge-tooltip {
          background: #1E293B;
          border: 1px solid #2D3F55;
          color: #E2E8F0;
          font-size: 0.75rem;
          padding: 3px 8px;
          border-radius: 6px;
          white-space: nowrap;
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        }
        .ibge-tooltip::before { display: none; }
        .leaflet-tile-pane { filter: brightness(0.85) saturate(0.6); }
      `}</style>
      <MapContainer
        bounds={bounds}
        style={{ height: "420px", width: "100%", borderRadius: "12px" }}
        scrollWheelZoom
        zoomControl
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />
        <GeoJSON
          key={JSON.stringify(geoJson.features.length)}
          data={geoJson}
          style={() => defaultStyle}
          onEachFeature={onEachFeature}
        />
      </MapContainer>
    </>
  );
}
