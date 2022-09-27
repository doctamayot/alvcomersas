export interface IProducto {
  _id: string;
  copy: string;
  images: string[];
  precio: number;
  slug: string;
  nuevo: string;
  categoria:
    | "Equipo Militar o Camping"
    | "Herrajes"
    | "Institucional"
    | "Servicio de Troquelado y Embutido";

  titulo: string;
  tags: string[];
}
