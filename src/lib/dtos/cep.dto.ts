export interface CepDTO {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  service: string;
}

interface CepServiceError {
  name: string;
  message: string;
  service: string;
}

export interface CepErrorDTO {
  name: string;
  message: string;
  type: string;
  errors: CepServiceError[];
}
