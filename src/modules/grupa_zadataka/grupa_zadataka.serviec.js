import { GrupaZadatakaRepo } from "./grupa_zadataka.repo";

const GrupaZadatakaService = {
  dodajGrupu: (obj) => {
    return GrupaZadatakaRepo.dodajGrupu(obj);
  },
  dohvatiGrupe: () => {
    return GrupaZadatakaRepo.dohvatiGrupe();
  },
  obrisiGrupu: (id) => {
    return GrupaZadatakaRepo.obrisiGrupu(id);
  },
  izmeniGrupu: (obj) => {
    return GrupaZadatakaRepo.izmeniGrupu(obj);
  },
};

export { GrupaZadatakaService };
