import { api } from "../../lib";

const DOMAIN = "/projekat_backend/logika/";

const KorisnikRepo = {
  dodajKorisnika: (obj) => {
    return api.post(`${DOMAIN}dodaj_korisnika.php`, obj);
  },
  dohvatiKorisnika: () => {
    return api.get(`${DOMAIN}dohvati_korisnike.php`);
  },
  izmeniKorisnika: (id, obj) => {
    // dodaj id
    return api.post(`${DOMAIN}izmeni_korisnika.php?id=${id}`, obj);
  },
  izmeniLozinku: (id, obj) => {
    // dodaj id
    return api.post(`${DOMAIN}izmeni_lozinku.php?id=${id}`, obj);
  },
  obrisiKorisnika: (id) => {
    return api.delete(`${DOMAIN}obrisi_korisnika.php?id=${id}`);
  },
  registrujSe: (obj) => {
    return api.post(`${DOMAIN}registruj_se.php`, obj);
  },
  prijaviSe: (obj) => {
    return api.post(`${DOMAIN}prijavi_se.php`, obj);
  },
  dohvatiKorisnikaPoUlozi: (naziv) => {
    return api.get(`${DOMAIN}dohvati_korisnika_po_ulozi.php?naziv=${naziv}`);
  },
  dodajVezuZadatakIzvrsioc: (obj) => {
    return api.post(`${DOMAIN}dodaj_zadatak_izvrsioc_vezu.php`, obj);
  },
  dohvatiIzvrsioce: (zadatak_id) => {
    return api.get(
      `${DOMAIN}dohvati_izvrsioce_zadatka.php?zadatak_id=${zadatak_id}`
    );
  },
  dohvatiKorisnikaPoId: (id) => {
    return api.get(`${DOMAIN}dohvati_korisnika_po_id.php?id=${id}`);
  },
  dohvatiKorinikeIUloge: () => {
    return api.get(`${DOMAIN}dohvati_korisnike_i_uloge.php`);
  },
  potvrdiEmail: (obj) => {
    return api.post(`${DOMAIN}zahtev_za_promenu_lozinke.php`, obj);
  },
  aktivirajNalog: (obj) => {
    return api.post(`${DOMAIN}aktivacija_naloga.php`, obj);
  },
  aktiviraj: (obj) => {
    return api.post(`${DOMAIN}aktiviraj.php`, obj);
  },
};

export { KorisnikRepo };
