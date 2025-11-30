import { useEffect, useState } from "react";

interface Client {
  id: number;
  description: string;
  address: string;
}

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    async function fetchClients() {
      try {
        const request = await fetch("http://localhost:3000/clients");
        if (!request.ok) {
          throw new Error("Failed to fetch clients");
        }
        const response = await request.json();
        setClients(response);
      } catch (err) {
        console.error(err);
      }
    }

    fetchClients();
  }, []);

  return (
    <div className="flex-auto min-h-screen bg-zinc-900 text-white p-6">
      <ul>
        {clients.map((c) => {
          return (
            <li key={c.id}>
              {c.description} : {c.address}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
