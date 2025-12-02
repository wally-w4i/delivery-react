import {
  GoogleMap,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { useState } from "react";

interface MapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLocationSelect: (position: { lat: number; lng: number }) => void;
  initialPosition?: { lat: number; lng: number };
}

const containerStyle = {
  width: "100%",
  height: "400px",
};

const MapModal = ({
  isOpen,
  onClose,
  onLocationSelect,
  initialPosition,
}: MapModalProps) => {
  const [selectedPosition, setSelectedPosition] = useState(initialPosition);

  const defaultCenter = initialPosition || {
    lat: -34.397,
    lng: 150.644,
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const position = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setSelectedPosition(position);
    }
  };

  const handleConfirm = () => {
    if (selectedPosition) {
      onLocationSelect(selectedPosition);
    }
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-zinc-800 p-6 rounded-lg shadow-lg text-white">
          <h2 className="text-xl font-bold mb-4">Google Maps API Key Error</h2>
          <p>
            The Google Maps API key is missing. Please add it to your .env file
            as VITE_GOOGLE_MAPS_API_KEY.
          </p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md font-medium"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-xl font-bold mb-4 text-white">
          Select GPS Location
        </h2>
        <LoadScript googleMapsApiKey={apiKey}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={defaultCenter}
            zoom={10}
            onClick={handleMapClick}
          >
            {selectedPosition && <Marker position={selectedPosition} />}
          </GoogleMap>
        </LoadScript>
        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md font-medium"
            disabled={!selectedPosition}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapModal;
