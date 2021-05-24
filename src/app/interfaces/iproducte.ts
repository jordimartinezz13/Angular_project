import { ICategoria } from '../interfaces/icategoria';
export interface IProducte {
//    producteId: number;
//    producteNom: string;
//    productePreu: number;
//    producteCategoria: ICategoria;
    //producteCategoria: string;
//    producteImatge: string;

    id: number;
    nom: string;
    preu: number;
    categoria: ICategoria;
    imatge: string;
      
}