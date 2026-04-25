export interface CnpjSocioDTO {
  nome_socio: string;
  qualificacao_socio: string;
  faixa_etaria: string;
  data_entrada_sociedade: string;
}

export interface CnpjDTO {
  cnpj: string;
  razao_social: string;
  nome_fantasia: string;
  descricao_situacao_cadastral: string;
  data_inicio_atividade: string;
  cnae_fiscal_descricao: string;
  natureza_juridica: string;
  porte: string;
  capital_social: number;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  municipio: string;
  uf: string;
  cep: string;
  ddd_telefone_1: string;
  email: string | null;
  qsa: CnpjSocioDTO[];
}

export interface BrasilApiErrorDTO {
  name: string;
  message: string;
  type: string;
}
