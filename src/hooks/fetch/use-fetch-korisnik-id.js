import { useQuery } from "react-query";
import { KorisnikService } from "../../modules";

const useFetchKorisnikId = ([key, id], options = {}) => {
  const dohvatiKorisnikaPoId = async () => {
    const res = await KorisnikService.dohvatiKorisnikaPoId(id);
    return res.data;
  };
  return useQuery([key, id], dohvatiKorisnikaPoId, { ...options });
};

export { useFetchKorisnikId };
