import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import * as maplibre from "maplibre-gl";

const CENTER_OF_THE_WORLD = { lat: 44.5, lng: 16.9 } as const;

export const Route = createFileRoute("/")({
	component: Home,
});

function Home() {
	const mapContainer = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!mapContainer.current) return;

		const map = new maplibre.Map({
			container: mapContainer.current,
			style: "https://demotiles.maplibre.org/style.json",
			center: CENTER_OF_THE_WORLD,
			zoom: 5,
		})
			.addControl(
				new maplibre.NavigationControl({
					showCompass: true,
					showZoom: true,
					visualizePitch: true,
				}),
			)
			.addControl(
				new maplibre.GeolocateControl({
					positionOptions: {
						enableHighAccuracy: true,
					},
					trackUserLocation: true,
				}),
			);

		return () => map.remove();
	}, []);

	return <div ref={mapContainer} style={{ width: "100%", height: "100%" }} />;
}
