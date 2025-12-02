const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

const API_BASE_URL = "http://localhost:8080/api";
const CLIENTS_API_URL = `${API_BASE_URL}/clients`;
const DELIVERIES_API_URL = `${API_BASE_URL}/deliveries`;

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
export interface Delivery {
  id: number;
  date: string;
  status: "PENDING" | "IN_PROGRESS" | "DELIVERED" | "CANCELLED";
  details: { clientId: number }[];
}

export const getDeliveries = async (): Promise<Delivery[]> => {
  const token = getAuthToken();
  const request = await fetch(DELIVERIES_API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!request.ok) {
    throw new Error("Failed to fetch deliveries");
  }
  return await request.json();
};

export const createDelivery = async (
  delivery: Omit<Delivery, "id">
): Promise<Delivery> => {
  console.log(JSON.stringify(delivery));
  const token = getAuthToken();
  const request = await fetch(DELIVERIES_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(delivery),
  });
  if (!request.ok) {
    throw new Error("Failed to create delivery");
  }
  return await request.json();
};

export const getClients = async (): Promise<Client[]> => {
  const token = getAuthToken();
  const request = await fetch(CLIENTS_API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!request.ok) {
    throw new Error("Failed to fetch clients");
  }
  return await request.json();
};

export const createClient = async (
  client: Omit<Client, "id">
): Promise<Client> => {
  const token = getAuthToken();
  const request = await fetch(CLIENTS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
  const token = getAuthToken();
  const request = await fetch(`${CLIENTS_API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(client),
  });
  if (!request.ok) {
    throw new Error("Failed to update client");
  }
  return await request.json();
};

export const deleteClient = async (id: number): Promise<void> => {
  const token = getAuthToken();
  const request = await fetch(`${CLIENTS_API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!request.ok) {
    throw new Error("Failed to delete client");
  }
};
