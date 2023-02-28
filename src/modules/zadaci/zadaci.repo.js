import { api } from "../../lib";

const DOMAIN = "/projekat_backend/logika/";

const ZadaciRepo = {
  dodajZadatak: (obj) => {
    return api.post(`${DOMAIN}dodaj_zadatak.php`, obj);
  },
  dohvatiZadatke: (grupa_id) => {
    return api.get(`${DOMAIN}dohvati_zadatak.php?grupa_id=${grupa_id}`);
  },
  obrisiZadatak: (id) => {
    return api.delete(`${DOMAIN}obrisi_zadatak.php?id=${id}`);
  },
  izmeniZadatak: (id) => {
    return api.post(`${DOMAIN}izmeni_zadatak.php`, id);
  },
  dohvatiZadatakZaIzvrsioca: (id) => {
    return api.get(
      `${DOMAIN}dohvati_zadatak_za_izvrsioca.php?korisnik_id=${id}`
    );
  },
};
export { ZadaciRepo };
