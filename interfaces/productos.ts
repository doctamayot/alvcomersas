export interface IProducto {
  _id: string;
  copy: string;
  images: string[];
  precio: number;
  slug: string;
  categoria:
    | "Equipo Militar o Camping"
    | "Herrajes"
    | "Institucional"
    | "Vallas de Contención"
    | "Servicio de Troquelado y Embutido"
    | "Placas de Identificación";
  titulo: string;
  tags: string[];
}
