const API_URL = "http://localhost:8080/api/clients";

export interface GpsPosition {
  latitude: number;
  longitude: number;
}
export interface Client {
  id: number;
  description: string;
  address: string;
  gpsPosition?: GpsPosition;
}

export const getClients = async (): Promise<Client[]> => {
  const request = await fetch(API_URL);
  if (!request.ok) {
    throw new Error("Failed to fetch clients");
  }
  return await request.json();
};

export const createClient = async (
  client: Omit<Client, "id">
): Promise<Client> => {
  const request = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });
  if (!request.ok) {
    throw new Error("Failed to create client");
  }
  return await request.json();
};

export const updateClient = async (
  id: number,
  client: Omit<Client, "id">
): Promise<Client> => {
  const request = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(client),
  });
  if (!request.ok) {
    throw new Error("Failed to update client");
  }
  return await request.json();
};

export const deleteClient = async (id: number): Promise<void> => {
  const request = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!request.ok) {
    throw new Error("Failed to delete client");
  }
};
