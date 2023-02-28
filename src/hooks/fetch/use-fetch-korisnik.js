import { useQuery } from "react-query";
import { KorisnikService } from "../../modules";

const useFetchKorisnik = (key, options = {}) => {
  const dohvatiKorisnik = async () => {
    const res = await KorisnikService.dohvatiKorisnika();
    return res.data;
  };
  return useQuery(key, dohvatiKorisnik, { ...options });
};

export { useFetchKorisnik };
