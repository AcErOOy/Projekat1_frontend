import { KomentarRepo } from "./komenter.repo";

const KomentarService = {
  dodajKomentar: (obj) => {
    return KomentarRepo.dodajKomentar(obj);
  },
  obrisiKomentar: (korisnik_id) => {
    return KomentarRepo.obrisiKomentar(korisnik_id);
  },
  dohvatiKomentar: (zadatak_id) => {
    return KomentarRepo.dohvatiKomentar(zadatak_id);
  },
  obrisiJedanKomentar: (id) => {
    return KomentarRepo.obrisiJedanKomentar(id);
  },
  izmeniKomentar: (obj) => {
    return KomentarRepo.izmeniKomentar(obj);
  },
};

export { KomentarService };
