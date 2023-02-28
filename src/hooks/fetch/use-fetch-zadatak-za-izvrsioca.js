import { useQuery } from "react-query";
import { ZadaciService } from "../../modules/zadaci/zadaci.service";

const useFetchZadaciZaIzvrsioca = ([key, korisnik_id], options = {}) => {
  const fetch = async () => {
    const res = await ZadaciService.dohvatiZadatakZaIzvrsioca(korisnik_id);
    return res.data;
  };

  return useQuery([key, korisnik_id], fetch, { ...options });
};

export { useFetchZadaciZaIzvrsioca };
