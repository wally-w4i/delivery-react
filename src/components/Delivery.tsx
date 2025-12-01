import { useEffect, useState } from "react";
import type { Delivery, Client } from "../services/api.services";
import {
  getDeliveries,
  createDelivery,
  getClients,
} from "../services/api.services";
import AddDeliveryDialog from "./AddDeliveryDialog";

export default function Delivery() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDeliveries = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const deliveriesResponse = await getDeliveries();
      setDeliveries(deliveriesResponse);
      const clientsResponse = await getClients();
      setClients(clientsResponse);
    } catch (err) {
      console.error(err);
      setError((err as Error).message || "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const handleSubmit = async (deliveryData: {
    date: string;
    status: "PENDING" | "IN_PROGRESS" | "DELIVERED" | "CANCELLED";
    details: { clientId: number }[];
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      const addedDelivery = await createDelivery(deliveryData);
      setDeliveries((prevDeliveries) => [...prevDeliveries, addedDelivery]);
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      setError((err as Error).message || "Failed to save delivery");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddNew = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex-auto min-h-screen bg-zinc-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Delivery</h1>

      <div className="mb-4">
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium"
        >
          New Delivery
        </button>
      </div>

      <AddDeliveryDialog
        isOpen={isModalOpen}
        onClose={handleCancel}
        onSubmit={handleSubmit}
        delivery={null}
        isLoading={isLoading}
        error={error}
      />

      <div>
        <h2 className="text-xl font-semibold mb-2">Existing Deliveries</h2>
        {isLoading && <p>Loading deliveries...</p>}
        {error && !deliveries.length && (
          <p className="text-red-500 mb-4">{error}</p>
        )}
        <ul>
          {deliveries.map((d) => (
            <li
              key={d.id}
              className="mb-2 p-3 bg-zinc-800 border border-zinc-700 rounded-md"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold">
                  {d.date} - {d.status}
                </span>
              </div>
              <ul className="mt-2">
                {d.details.map((detail) => (
                  <li key={detail.clientId} className="ml-4">
                    -{" "}
                    {clients.find((c) => c.id === detail.clientId)
                      ?.description || "Unknown Client"}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
