import { api } from "../../lib";

const DOMAIN = "/projekat_backend/logika/";

const KomentarRepo = {
  dodajKomentar: (obj) => {
    return api.post(`${DOMAIN}ostavi_komentar.php`, obj);
  },
  obrisiKomentar: (korisnik_id) => {
    return api.delete(
      `${DOMAIN}obrisi_komentar.php?korisnik_id=${korisnik_id}`
    );
  },
  dohvatiKomentar: (zadatak_id) => {
    return api.get(`${DOMAIN}dohvati_komentare.php?zadatak_id=${zadatak_id}`);
  },
  obrisiJedanKomentar: (id) => {
    return api.delete(`${DOMAIN}obrisi_jedan_komentar.php?id=${id}`);
  },
  izmeniKomentar: (obj) => {
    return api.post(`${DOMAIN}izmeni_komentar.php`, obj);
  },
};

export { KomentarRepo };
