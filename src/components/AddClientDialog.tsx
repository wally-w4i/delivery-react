import { useEffect, useState } from "react";
import type { Client } from "../services/api.services";

interface AddClientDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (client: { description: string; address: string }) => void;
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
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (client) {
      setDescription(client.description || "");
      setAddress(client.address || "");
    } else {
      setDescription("");
      setAddress("");
    }
  }, [client]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ description, address });
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
