
async function initMap() {
    const mapElement = document.getElementById("map");
    const messageElement = document.getElementById("map-message");

    try {
        const { Map, InfoWindow } =
            await google.maps.importLibrary("maps");

        const { AdvancedMarkerElement } =
            await google.maps.importLibrary("marker");

        const { Geocoder } =
            await google.maps.importLibrary("geocoding");

        const address =
            "130 Clark Road, Durban, KwaZulu-Natal, South Africa";

        // Create the interactive map
        const map = new Map(mapElement, {
            center: { lat: -29.8587, lng: 31.0218 },
            zoom: 14,
            mapId: "DEMO_MAP_ID",
            zoomControl: true,
            streetViewControl: true,
            mapTypeControl: true,
            fullscreenControl: true
        });

        // Find the address using Google's geocoder
        const geocoder = new Geocoder();

        const response = await geocoder.geocode({
            address: address
        });

        if (!response.results.length) {
            throw new Error("The address could not be found.");
        }

        const location = response.results[0].geometry.location;

        // Center the map on the matched address
        map.setCenter(location);
        map.setZoom(16);

        // Add a marker to the location
        const marker = new AdvancedMarkerElement({
            map: map,
            position: location,
            title: "Kwa Shumilensizwa"
        });

        // Create the information window
        const infoWindow = new InfoWindow({
            content: `
                <div style="padding: 8px; max-width: 240px;">
                    <h3>Kwa Shumilensizwa</h3>
                    <p>
                        130 Clark Road<br>
                        Durban, KwaZulu-Natal<br>
                        South Africa
                    </p>
                    <a
                        href="https://www.google.com/maps/dir/?api=1&destination=130%20Clark%20Road%2C%20Durban%2C%20KwaZulu-Natal%2C%20South%20Africa"
                        target="_blank"
                        rel="noopener noreferrer">
                        Get Directions
                    </a>
                </div>
            `
        });

        // Open the information window when the marker is clicked
        marker.addListener("click", () => {
            infoWindow.open({
                map: map,
                anchor: marker
            });
        });

        // Display the restaurant information initially
        infoWindow.open({
            map: map,
            anchor: marker
        });

        messageElement.textContent = "";

    } catch (error) {
        console.error("Google Maps error:", error);

        messageElement.textContent =
            "The map could not load. Please check your API key, " +
            "Google Cloud settings and internet connection.";
    }
}
