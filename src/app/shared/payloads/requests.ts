export interface LoginRequest {
  username: string;
  password: string;
}

interface CreateRegionRequest {
  id: number;
  name: string;
}

export interface CreateClientRequest {
  firstName: string;
  lastName: string;
  email: string;
  region: CreateRegionRequest;
}

export interface UpdateClientRequest extends CreateClientRequest {
  id: number;
}
