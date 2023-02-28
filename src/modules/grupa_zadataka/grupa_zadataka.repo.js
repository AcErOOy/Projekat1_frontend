import { api } from "../../lib";

const DOMAIN = "//logika/";projekat_backend

const GrupaZadatakaRepo = {
  dodajGrupu: (obj) => {
    return api.post(`${DOMAIN}dodaj_grupu.php`, obj);
  },
  dohvatiGrupe: () => {
    return api.get(`${DOMAIN}dohvati_grupe.php`);
  },
  obrisiGrupu: (id) => {
    return api.delete(`${DOMAIN}obrisi_grupu.php?id=${id}`);
  },
  izmeniGrupu: (obj) => {
    return api.post(`${DOMAIN}/izmeni_grupu.php`, obj);
  },
};

export { GrupaZadatakaRepo };
