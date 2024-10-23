export interface InitiativeResultType {
  id: number;
  tipoId: number;
  tipo: string;
  camaraInicioId: number;
  camaraInicio: string;
  numero: string;
  descripcion: string;
  periodoCreacionId: number;
  periodoId: number;
  periodoRegistro: string;
  iniciado: string;
  fechaIniciado: string | null;
  temaId: number | null;
  materiaId: number;
  materia: string;
  legislaturaId: number;
  numPromulgacion: string | null;
  fechaPromulgacion: string | null;
  condicionId: number;
  condicion: string;
  estadoId: number;
  estado: string;
  fechaDeposito: string;
  fechaUltimoCambioPrincipal: string;
  creadorPor: string;
  anoLegislativoId: number;
  grupoId: number;
  grupo: string;
  icono: string;
  origenId: number;
  origen: string;
  legislatura: string;
}

export interface InitiativeType { 
  page: number;
  pageSize: number;
  total: number;
  results: InitiativeResultType[]; 
}

export interface InitiativePaginationState {
  page: number;
  grupo: number;
  tipo: boolean | undefined;
  perimidas: boolean;
  keyword: string;
  periodoId: number;
}

export interface GruposType {
  id: number;
  descripcion: string;
  icono: string;
}

export interface GruposPaginationState {
  periodoId: number;
}

export interface GruposCardProps {
  grupo: GruposType;
  tipo: boolean;
} 

export interface IdentifierLawType {
  page: number;
  id: number; 
  periodoId: number;
}

export interface DocsResults {
  id: number;
  documento: string;
  descripcion: string;
  extension: string;
  cargado: string;
  orden: number;
  ruta: number | null;
  tagKey: number;
}

export interface DocsProps {
  page: number;
  pageSize: number;
  total: number;
  results: DocsResults[]
}

export interface PoliticalParty {
  id: number;
  nombre: string;
  siglas: string;
}

export interface Representation {
  funcion: string;
  nivelRepresentacion: string;
  provincia: string;
  partido: PoliticalParty;
  ejercicio: string;
  inicio: string;
  fin: string;
  periodo: string;
  provinciaId: number | null;
  nivelId: number;
  funcionId: number | null;
  circunscripcionId: number | null;
  circunscripcion: number | null;
}

export interface PromoterResults {
  principal: boolean;
  representacion: Representation;
  legisladorId: number;
  nombres: string;
  apellidos: string;
  nombreCompleto: string;
  cargo: string | null;
  partido: string | null;
} 

export interface PromoterProps {
  page: number;
  pageSize: number;
  total: number;
  results: PromoterResults[]
}