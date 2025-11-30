import { useEffect, useState } from "react";
import {
  getClients,
  createClient,
  updateClient,
  deleteClient,
  Client,
} from "../services/api.services";

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [newClientDescription, setNewClientDescription] = useState("");
  const [newClientAddress, setNewClientAddress] = useState("");
  const [editingClientId, setEditingClientId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientDescription || !newClientAddress) return;

    setIsLoading(true);
    setError(null);

    try {
      if (editingClientId !== null) {
        // PUT request (Update existing client)
        const updatedClientData = {
          description: newClientDescription,
          address: newClientAddress,
        };
        const responseData = await updateClient(
          editingClientId,
          updatedClientData
        );
        setClients((prevClients) =>
          prevClients.map((client) =>
            client.id === editingClientId ? responseData : client
          )
        );
        setEditingClientId(null);
      } else {
        // POST request (Add new client)
        const newClientData = {
          description: newClientDescription,
          address: newClientAddress,
        };
        const addedClient = await createClient(newClientData);
        setClients((prevClients) => [...prevClients, addedClient]);
      }
      setNewClientDescription("");
      setNewClientAddress("");
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
    setNewClientDescription(client.description);
    setNewClientAddress(client.address);
  };

  const handleCancelEdit = () => {
    setEditingClientId(null);
    setNewClientDescription("");
    setNewClientAddress("");
  };

  return (
    <div className="flex-auto min-h-screen bg-zinc-900 text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>

      <form
        onSubmit={handleSubmit}
        className="mb-8 p-4 border border-zinc-700 rounded-lg"
      >
        <h2 className="text-xl font-semibold mb-2">
          {editingClientId !== null ? "Edit Client" : "Add New Client"}
        </h2>
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
            value={newClientDescription}
            onChange={(e) => setNewClientDescription(e.target.value)}
            className="mt-1 block w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
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
            value={newClientAddress}
            onChange={(e) => setNewClientAddress(e.target.value)}
            className="mt-1 block w-full p-2 bg-zinc-800 border border-zinc-700 rounded-md text-white"
            required
            disabled={isLoading}
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className={`px-4 py-2 \${
              isLoading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
            } rounded-md text-white font-medium`}
            disabled={isLoading}
          >
            {isLoading
              ? "Saving..."
              : editingClientId !== null
              ? "Update Client"
              : "Add Client"}
          </button>
          {editingClientId !== null && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className={`px-4 py-2 \${
                isLoading ? "bg-gray-400" : "bg-gray-600 hover:bg-gray-700"
              } rounded-md text-white font-medium`}
              disabled={isLoading}
            >
              Cancel Edit
            </button>
          )}
        </div>
      </form>

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
              <span>
                {c.description} : {c.address}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(c)}
                  className={`px-3 py-1 \${
                    isLoading ? "bg-yellow-400" : "bg-yellow-600 hover:bg-yellow-700"
                  } rounded-md text-white text-sm`}
                  disabled={isLoading}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(c.id)}
                  className={`px-3 py-1 \${
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
