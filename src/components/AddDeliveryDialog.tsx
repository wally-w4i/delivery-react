import { useEffect, useState } from "react";
import type { Client, Delivery } from "../services/api.services";
import { getClients } from "../services/api.services";

interface AddDeliveryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (delivery: {
    date: string;
    status: "PENDING" | "IN_PROGRESS" | "DELIVERED" | "CANCELLED";
    details: { clientId: number }[];
  }) => void;
  delivery: Partial<Delivery> | null | undefined;
  isLoading: boolean;
  error: string | null;
}

export default function AddDeliveryDialog({
  isOpen,
  onClose,
  onSubmit,
  delivery,
  isLoading,
  error,
}: AddDeliveryDialogProps) {
  const [date, setDate] = useState(delivery?.date || "");
  const [status, setStatus] = useState<
    "PENDING" | "IN_PROGRESS" | "DELIVERED" | "CANCELLED"
  >(delivery?.status || "PENDING");
  const [selectedClients, setSelectedClients] = useState<number[]>(
    delivery?.details?.map((d) => d.clientId) || []
  );
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    if (isOpen) {
      getClients().then(setClients);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const deliveryData = {
      date,
      status,
      details: selectedClients.map((clientId) => ({ clientId })),
    };
    onSubmit(deliveryData);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-zinc-800 p-8 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">
          {delivery ? "Edit Delivery" : "Add New Delivery"}
        </h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-zinc-400"
            >
              Delivery Date
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1 block w-full p-2 bg-zinc-700 border border-zinc-600 rounded-md text-white"
              required
              disabled={isLoading}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-zinc-400"
            >
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as
                    | "PENDING"
                    | "IN_PROGRESS"
                    | "DELIVERED"
                    | "CANCELLED"
                )
              }
              className="mt-1 block w-full p-2 bg-zinc-700 border border-zinc-600 rounded-md text-white"
              required
              disabled={isLoading}
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="DELIVERED">Delivered</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="clients"
              className="block text-sm font-medium text-zinc-400"
            >
              Clients
            </label>
            <select
              id="clients"
              multiple
              value={selectedClients.map(String)}
              onChange={(e) =>
                setSelectedClients(
                  Array.from(e.target.selectedOptions, (option) =>
                    Number(option.value)
                  )
                )
              }
              className="mt-1 block w-full p-2 bg-zinc-700 border border-zinc-600 rounded-md text-white"
              required
              disabled={isLoading}
            >
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.description}
                </option>
              ))}
            </select>
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
                : delivery
                ? "Update Delivery"
                : "Add Delivery"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
