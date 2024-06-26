import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

const RoutingComponent = ({ start, end }: any) => {
  const map = useMap();
  useMemo(() => {
    const apiKey = "5b3ce3597851110001cf62484db39631b306449cb2097397e6cc4d8b"; // API key for directions and routing
    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start.join(
      ","
    )}&end=${end.join(",")}`;

    const fetchRoute = async () => {
      try {
        const response = await axios.get(url);
        console.log("Response:", response);
        const route = response.data.features[0].geometry.coordinates;

        const latLngs = route.map((cord: any) => [cord[1], cord[0]]);
        const routingLine = L.polyline(latLngs, {
          color: "blue",
        }).addTo(map);

        map.fitBounds(routingLine.getBounds());
      } catch (error) {
        console.log(error);
      }
    };

    fetchRoute();
  }, [map, start, end]);

  return null;
};

const LeafletMap = () => {
  const center = {
    lat: 21.2354245,
    lng: 72.8238808,
  };
  const [mapComponent, setMapComponent] = useState(null);
  const [draggable, setDraggable] = useState(true);
  const [position, setPosition] = useState(center);
  const [start, setStart] = useState([8.681495, 49.41461]);
  const [end, setEnd] = useState([8.687872, 49.420318]);
  const markerRef = useRef(null);

  const eventHandler = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker !== null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    []
  );

  useEffect(() => {
    import("react-leaflet").then((modules) => {
      setMapComponent(modules);
    });
  }, []);

  const handleStartChange = (e: any) => {
    const { name, value } = e.target;
    setStart((prevStart) => {
      const newStart = [...prevStart];
      newStart[name === "startLat" ? 0 : 1] = parseFloat(value);
      return newStart;
    });
  };

  const handleEndChange = (e: any) => {
    const { name, value } = e.target;
    setEnd((prevEnd) => {
      const newEnd = [...prevEnd];
      newEnd[name === "endLat" ? 0 : 1] = parseFloat(value);
      return newEnd;
    });
  };

  if (!mapComponent) return null;
  const { MapContainer, TileLayer, Marker, Popup } = mapComponent;

  return (
    <>
      <form>
        <div>
          <label>
            Start Latitude:
            <input
              type="number"
              name="startLat"
              value={start[0]}
              onChange={handleStartChange}
            />
          </label>
          <label>
            Start Longitude:
            <input
              type="number"
              name="startLng"
              value={start[1]}
              onChange={handleStartChange}
            />
          </label>
        </div>
        <div>
          <label>
            End Latitude:
            <input
              type="number"
              name="endLat"
              value={end[0]}
              onChange={handleEndChange}
            />
          </label>
          <label>
            End Longitude:
            <input
              type="number"
              name="endLng"
              value={end[1]}
              onChange={handleEndChange}
            />
          </label>
        </div>
      </form>

      <MapContainer center={position} zoom={17} style={{ height: "100vh" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker
          position={position}
          ref={markerRef}
          eventHandlers={eventHandler}
          draggable={draggable}
        >
          <Popup>{`Codeverse Weenggs Solutions LLP [${center.lat},${center.lng}]`}</Popup>
        </Marker>
        <RoutingComponent start={start} end={end} />
      </MapContainer>
    </>
  );
};

export default LeafletMap;

// import axios from "axios";

// import { useEffect, useMemo, useRef, useState } from "react";
// import { useMap } from "react-leaflet";
// import L from "leaflet";

// const RoutingComponent = () => {
//   const map = useMap();
//   useMemo(() => {
//     const apiKey = "5b3ce3597851110001cf62484db39631b306449cb2097397e6cc4d8b"; // api key to direction and routings
//     const start = [8.681495, 49.41461];
//     const end = [8.687872, 49.420318];
//     const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start.join(
//       ","
//     )}&end=${end.join(",")}`;

//     const fetchRoute = async () => {
//       try {
//         const response = await axios.get(url);
//         console.log("Response:", response);
//         const route = response.data.features[0].geometry.coordinates;

//         const latLngs = route.map((cord: any) => [cord[1], cord[0]]);
//         const routingLine = L.polyline(latLngs, {
//           color: "blue",
//         }).addTo(map);

//         map.fitBounds(routingLine.getBounds());
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchRoute();
//   }, [map]);

//   return null;
// };

// const LeafletMap = () => {
//   const center = {
//     lat: 21.2354245,
//     lng: 72.8238808,
//   };
//   const [Map, setMap] = useState<React.ComponentType<any> | null>(null);
//   const [draggable, setDraggable] = useState(true);
//   const [position, setPositon] = useState(center);
//   const markerRef = useRef(null);

//   const locations = [
//     [8.681495, 49.41461],
//     [8.687872, 49.420318],
//   ];

//   const eventhandler = useMemo(
//     () => ({
//       dragend() {
//         const marker = markerRef.current;
//         if (marker !== null) {
//           setPositon(marker.getLatLng());
//         }
//       },
//     }),
//     []
//   );

//   useEffect(() => {
//     import("react-leaflet").then((module) => {
//       const { MapContainer, TileLayer, Marker, Popup } = module;
//       setMap(() => () => (
//         <MapContainer center={position} zoom={17} style={{ height: "100vh" }}>
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <Marker
//             position={position}
//             ref={markerRef}
//             eventHandlers={eventhandler}
//             draggable={draggable}
//           >
//             <Popup>{`Codeverse Weenggs Solutions LLP [${center.lat},${center.lng}]`}</Popup>
//           </Marker>
//           <RoutingComponent />
//         </MapContainer>
//       ));
//     });
//   }, []);

//   if (!Map) return null;

//   return <Map />;
// };

// export default LeafletMap;

// import axios from "axios";
// import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// const LeafletMap = () => {
//   const center = {
//     lat: 21.2354245,
//     lng: 72.8238808,
//   };
//   const [Map, setMap] = useState<React.ComponentType<any> | null>(null);
//   const [draggable, setDraggable] = useState(true);
//   const [position, setPositon] = useState(center);
//   const markerRef = useRef(null);

//   // const [lat, setLat] = useState<Number | any>(21.2354245);
//   // const [lan, setLan] = useState<Number | any>(72.8238808);
//   // 21.14075 72.50150

//   useEffect(() => {
//     const apiKey = "5b3ce3597851110001cf62484db39631b306449cb2097397e6cc4d8b"; // api key to direction and routings
//     // const start = [21.2354245, 72.8238808];
//     // const end = [21.2573852, 2.830415];
//     const start = [8.681495, 49.41461];
//     const end = [8.687872, 49.420318];
//     const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${start.join(
//       ","
//     )}&end=${end.join(",")}`;
//     const fetchRoute = async () => {
//       try {
//         const response = await axios.get(url);
//         console.log("Response:", response);
//         const route = response.data.features[0].geometry.coordinates;
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchRoute();
//   }, []);

//   const eventhandler = useMemo(
//     () => ({
//       dragend() {
//         const marker = markerRef.current;
//         if (marker !== null) {
//           console.log(marker.getLatLng(), "position");
//           setPositon(marker.getLatLng());
//         }
//       },
//     }),
//     []
//   );

//   useEffect(() => {
//     import("react-leaflet").then((module) => {
//       const { MapContainer, TileLayer, Marker, Popup } = module;
//       setMap(() => () => (
//         <MapContainer center={position} zoom={13} style={{ height: "100vh" }}>
//           <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//           <Marker
//             position={position}
//             ref={markerRef}
//             eventHandlers={eventhandler}
//             draggable={draggable}
//           >
//             <Popup>{`Codeverse Weenggs Solutions LLP [${center.lat},${center.lng}]`}</Popup>
//           </Marker>
//         </MapContainer>
//       ));
//     });
//   }, []);

//   if (!Map) return null;

//   return <Map />;
// };

// export default LeafletMap;

// const options = {
//   enableHighAccuracy: true,
//   timeout: 5000,
//   maximumAge: 0,
// };

// function error(err: any) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }

// function success(pos: any) {
//   const crd = pos.coords;

//   // setLat(crd.latitude);
//   // setLan(crd.longitude);

//   console.log("Your current position is:");
//   console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
//   console.log(`More or less ${crd.accuracy} meters.`);
// }
// const cord = navigator.geolocation.getCurrentPosition(
//   success,
//   error,
//   options
// );
// console.log(cord);
