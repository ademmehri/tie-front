import { Role } from "./Role.model";
import { filee } from "./filee.model";

export class employee{
  
    nom!:string
    gouvernerat!:string
    fls!: { [key: string]: string };
    city!:string
    num!:string
    specialite!:string
    sexe!:string
    date_nais!:string
    exp!:string
    email!:string
    password!:string
    role!:string
    id!:bigint
    enable!:boolean
    cp!:string
    etat!:string
    roles!:Role[];
    pack!:TypePack
    duree!:Duree
    d_inscrit!:Date
  files!:filee[]
  employee!:employee
  employeur!:employee

}
enum TypePack {
    superieur,
    restaurer,
    servir,
    gold
  }
  enum Duree {
   six_mois,
   un_ans,
   set_jours
  }