import { useEffect, useState } from "react";
import type { Client, GpsPosition } from "../services/api.services";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
} from "../services/api.services";
import AddClientDialog from "./AddClientDialog";

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [editingClientId, setEditingClientId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchClients = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getClients();
      setClients(response);
    } catch (err) {
      console.error(err);
      setError((err as Error).message || "Failed to fetch clients");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (clientData: {
    description: string;
    address: string;
    gpsPositione: GpsPosition;
  }) => {
    setIsLoading(true);
    setError(null);

    try {
      if (editingClientId !== null) {
        // PUT request (Update existing client)
        const responseData = await updateClient(editingClientId, clientData);
        setClients((prevClients) =>
          prevClients.map((client) =>
            client.id === editingClientId ? responseData : client
          )
        );
      } else {
        // POST request (Add new client)
        const addedClient = await createClient(clientData);
        setClients((prevClients) => [...prevClients, addedClient]);
      }
      setIsModalOpen(false);
      setEditingClientId(null);
    } catch (err) {
      console.error(err);
      setError((err as Error).message || "Failed to save client");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    setError(null);
    try {
      await deleteClient(id);
      setClients((prevClients) =>
        prevClients.filter((client) => client.id !== id)
      );
    } catch (err) {
      console.error(err);
      setError((err as Error).message || "Failed to delete client");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (client: Client) => {
    setEditingClientId(client.id);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setEditingClientId(null);
    setIsModalOpen(false);
  };

  const handleAddNew = () => {
    setEditingClientId(null);
    setIsModalOpen(true);
  };

  const editingClient =
    editingClientId !== null
      ? clients.find((c) => c.id === editingClientId)
      : null;

  return (
    <div className="flex-auto min-h-screen bg-zinc-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>

      <div className="mb-4">
        <button
          onClick={handleAddNew}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-white font-medium"
        >
          Add New Client
        </button>
      </div>

      <AddClientDialog
        key={editingClientId || "new"}
        isOpen={isModalOpen}
        onClose={handleCancel}
        onSubmit={handleSubmit}
        client={editingClient}
        isLoading={isLoading}
        error={error}
      />

      <div>
        <h2 className="text-xl font-semibold mb-2">Existing Clients</h2>
        {isLoading && <p>Loading clients...</p>}
        {error && !clients.length && (
          <p className="text-red-500 mb-4">{error}</p>
        )}
        <ul>
          {clients.map((c) => (
            <li
              key={c.id}
              className="mb-2 p-3 bg-zinc-800 border border-zinc-700 rounded-md flex justify-between items-center"
            >
              <span className="flex">
                {c.description} : {c.address}
                {c.gpsPosition && (
                  <div className="flex ml-10 gap-3">
                    <div>LAT: {c.gpsPosition.latitude}</div>
                    <div>LON: {c.gpsPosition.longitude}</div>
                  </div>
                )}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(c)}
                  className={`px-3 py-1 ${
                    isLoading
                      ? "bg-yellow-400"
                      : "bg-yellow-600 hover:bg-yellow-700"
                  } rounded-md text-white text-sm`}
                  disabled={isLoading}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className={`px-3 py-1 ${
                    isLoading ? "bg-red-400" : "bg-red-600 hover:bg-red-700"
                  } rounded-md text-white text-sm`}
                  disabled={isLoading}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
