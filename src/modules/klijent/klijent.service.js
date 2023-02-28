import { KorisnikRepo } from "./klijent.repo";

const KorisnikService = {
  dodajKorisnik: (obj) => {
    return KorisnikRepo.dodajKorisnika(obj);
  },
  dohvatiKorisnika: () => {
    return KorisnikRepo.dohvatiKorisnika();
  },
  izmeniKorisnika: (id, obj) => {
    // dodaj id
    return KorisnikRepo.izmeniKorisnika(id, obj);
  },
  izmeniLozinku: (id, obj) => {
    // dodaj id
    return KorisnikRepo.izmeniLozinku(id, obj);
  },
  obrisiKorisnika: (id) => {
    return KorisnikRepo.obrisiKorisnika(id);
  },
  registrujSe: (obj) => {
    return KorisnikRepo.registrujSe(obj);
  },
  prijaviSe: (obj) => {
    return KorisnikRepo.prijaviSe(obj);
  },
  dohvatiKorisnikaPoUlozi: (naziv) => {
    return KorisnikRepo.dohvatiKorisnikaPoUlozi(naziv);
  },
  dodajVezuZadatakIzvrsioc: (obj) => {
    return KorisnikRepo.dodajVezuZadatakIzvrsioc(obj);
  },
  dohvatiIzvrsioce: (zadatak_id) => {
    return KorisnikRepo.dohvatiIzvrsioce(zadatak_id);
  },
  dohvatiKorisnikaPoId: (id) => {
    return KorisnikRepo.dohvatiKorisnikaPoId(id);
  },
  dohvatiKorinikeIUloge: () => {
    return KorisnikRepo.dohvatiKorinikeIUloge();
  },
  potvrdiEmail: (obj) => {
    return KorisnikRepo.potvrdiEmail(obj);
  },
  aktivirajNalog: (obj) => {
    return KorisnikRepo.aktivirajNalog(obj);
  },
  aktiviraj: (obj) => {
    return KorisnikRepo.aktiviraj(obj);
  },
};

export { KorisnikService };
