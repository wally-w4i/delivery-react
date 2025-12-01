import { useState } from "react";
import type { Client, GpsPosition } from "../services/api.services";

interface AddClientDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (client: {
    description: string;
    address: string;
    gpsPosition: GpsPosition;
  }) => void;
  client: Partial<Client> | null | undefined;
  isLoading: boolean;
  error: string | null;
}

export default function AddClientDialog({
  isOpen,
  onClose,
  onSubmit,
  client,
  isLoading,
  error,
}: AddClientDialogProps) {
  const [description, setDescription] = useState(client?.description || "");
  const [address, setAddress] = useState(client?.address || "");
  const [latitude, setLatitude] = useState(client?.gpsPosition?.latitude || 0);
  const [longitude, setLongitude] = useState(
    client?.gpsPosition?.longitude || 0
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clientData = {
      description,
      address,
      gpsPosition: { latitude, longitude },
    };
    onSubmit(clientData);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-zinc-800 p-8 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">
          {client ? "Edit Client" : "Add New Client"}
        </h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-zinc-400"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full p-2 bg-zinc-700 border border-zinc-600 rounded-md text-white"
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-zinc-400"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 block w-full p-2 bg-zinc-700 border border-zinc-600 rounded-md text-white"
              required
              disabled={isLoading}
            />
          </div>
          <div className="flex gap-5">
            <div className="mb-4">
              <label
                htmlFor="latitude"
                className="block text-sm font-medium text-zinc-400"
              >
                Latitude
              </label>
              <input
                type="number"
                step="0.00000000000000001"
                id="latitude"
                value={latitude}
                onChange={(e) => setLatitude(parseFloat(e.target.value))}
                className="mt-1 block w-full p-2 bg-zinc-700 border border-zinc-600 rounded-md text-white"
                disabled={isLoading}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="longitude"
                className="block text-sm font-medium text-zinc-400"
              >
                Longitude
              </label>
              <input
                type="number"
                step="0.00000000000000001"
                id="longitude"
                value={longitude}
                onChange={(e) => setLongitude(parseFloat(e.target.value))}
                className="mt-1 block w-full p-2 bg-zinc-700 border border-zinc-600 rounded-md text-white"
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-md text-white font-medium"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 ${
                isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
              } rounded-md text-white font-medium`}
              disabled={isLoading}
            >
              {isLoading
                ? "Saving..."
                : client
                ? "Update Client"
                : "Add Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
