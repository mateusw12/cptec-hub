export interface CvmCorretoraDTO {
  cnpj: string;
  codigo_cvm: string;
  nome_social: string;
  nome_comercial: string;
  status: string;
  email: string;
  telefone: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  municipio: string;
  uf: string;
  cep: string;
  valor_patrimonio_liquido: string;
  data_patrimonio_liquido: string;
}

export type CvmCorretorasResponseDTO = CvmCorretoraDTO[];

export interface CvmFundoDTO {
  cnpj: string;
  denominacao_social: string;
  codigo_cvm: string;
  tipo_fundo: string;
  situacao: string;
}

export interface CvmFundosResponseDTO {
  data: CvmFundoDTO[];
  page: number;
  size: number;
}
