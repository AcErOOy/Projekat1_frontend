import { ZadaciRepo } from "./zadaci.repo";

const ZadaciService = {
  dodajZadatak: (obj) => {
    return ZadaciRepo.dodajZadatak(obj);
  },
  dohvatiZadatke: (grupa_id) => {
    return ZadaciRepo.dohvatiZadatke(grupa_id);
  },
  obrisiZadatak: (id) => {
    return ZadaciRepo.obrisiZadatak(id);
  },
  izmeniZadatak: (id) => {
    return ZadaciRepo.izmeniZadatak(id);
  },
  dohvatiZadatakZaIzvrsioca: (id) => {
    return ZadaciRepo.dohvatiZadatakZaIzvrsioca(id);
  },
};
export { ZadaciService };
