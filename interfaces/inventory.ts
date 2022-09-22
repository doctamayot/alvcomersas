export interface IInventory {
  _id: any;
  copy: string;
  images: string[];
  partes: string[] | undefined;
  titulo: string;
  tags: string[];
  cantidad: number;
}
