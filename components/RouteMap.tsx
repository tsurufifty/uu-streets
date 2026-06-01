"use client";

import { YMaps, Map, Placemark, Polyline, ZoomControl } from "@pbe/react-yandex-maps";
import { useEffect, useRef } from "react";
import type { RoutePoint } from "@/data/route";

interface RouteMapProps {
  points: RoutePoint[];
  activeId: number | null;
  onSelect?: (id: number) => void;
}

export function RouteMap({ points, activeId, onSelect }: RouteMapProps) {
  const routePoints = points;
  const mapRef = useRef<any>(null);

  // Yandex Maps хочет [lat, lng] — наши данные уже в этом формате
  const center: [number, number] = [51.8334, 107.587];

  // Линия маршрута
  const polylineCoords = routePoints.map((p) => p.coords);

  // При смене активной точки — летим к ней
  useEffect(() => {
    if (!mapRef.current || activeId == null) return;
    const point = routePoints.find((p) => p.id === activeId);
    if (!point) return;
    try {
      mapRef.current.setCenter(point.coords, 16, { duration: 700 });
    } catch {
      // Карта ещё не готова — пропускаем
    }
  }, [activeId, routePoints]);

  // SVG для кастомного пина (рисуется как иконка-метка)
  const makeIconHref = (number: string, active: boolean) => {
    const fill = active ? "#b8e62c" : "#a83a2c";
    const textColor = active ? "#0a0908" : "#f5f1ea";
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='42' height='52' viewBox='0 0 42 52'>
      <path d='M21 0 C9.4 0 0 9.4 0 21 c0 15.7 21 31 21 31 s21-15.3 21-31 C42 9.4 32.6 0 21 0 z'
        fill='${fill}' stroke='#f5f1ea' stroke-width='2'/>
      <text x='21' y='27' text-anchor='middle'
        font-family='Gotham Pro, Impact, sans-serif' font-size='15' font-weight='900' fill='${textColor}'>${number}</text>
    </svg>`;
    return `data:image/svg+xml;base64,${typeof window === "undefined" ? "" : window.btoa(unescape(encodeURIComponent(svg)))}`;
  };

  // Читаем API-ключ из env, если он задан. Без ключа карта тоже работает (development).
  const apikey = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY;

  return (
    <div className="relative h-full w-full bg-ink-950 yandex-map-wrap">
      <YMaps query={apikey ? { apikey, lang: "ru_RU" } : { lang: "ru_RU" }}>
        <Map
          instanceRef={mapRef}
          defaultState={{ center, zoom: 14, controls: [] }}
          width="100%"
          height="100%"
          modules={["control.ZoomControl"]}
        >
          <ZoomControl options={{ position: { right: 12, top: 12 } }} />

          {/* Линия маршрута */}
          <Polyline
            geometry={polylineCoords}
            options={{
              strokeColor: "#a83a2c",
              strokeWidth: 4,
              strokeOpacity: 0.85,
              strokeStyle: "shortdash",
            }}
          />

          {/* Маркеры */}
          {routePoints.map((p) => {
            const isActive = p.id === activeId;
            return (
              <Placemark
                key={p.id}
                geometry={p.coords}
                onClick={() => onSelect?.(p.id)}
                options={{
                  iconLayout: "default#image",
                  iconImageHref: makeIconHref(p.number, isActive),
                  iconImageSize: [42, 52],
                  iconImageOffset: [-21, -52],
                  hideIconOnBalloonOpen: false,
                }}
                properties={{
                  hintContent: `${p.number} · ${p.title}`,
                  balloonContentHeader: `<strong style="font-family:Gotham Pro,sans-serif;text-transform:uppercase">${p.number} · ${p.title}</strong>`,
                  balloonContentBody: `<div style="font-family:Gotham Pro,sans-serif;font-size:12px;color:#3d3832">${p.location}</div>`,
                }}
              />
            );
          })}
        </Map>
      </YMaps>
    </div>
  );
}

export default RouteMap;
