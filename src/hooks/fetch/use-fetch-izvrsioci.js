import { useQuery } from "react-query";
import { KorisnikService } from "../../modules";

const useFetchIzvrsioci = ([key, zadatak_id], options = {}) => {
  const dohvatiIzvrsioce = async () => {
    const res = await KorisnikService.dohvatiIzvrsioce(zadatak_id);
    return res.data;
  };

  return useQuery([key, zadatak_id], dohvatiIzvrsioce, { ...options });
};

export { useFetchIzvrsioci };
