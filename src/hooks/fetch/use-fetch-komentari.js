import { useQuery } from "react-query";
import { KomentarService } from "../../modules/komentari/komentari.service";

const useFetchKomentari = ([key, zadatak_id], options = {}) => {
  const dohvatiKomentar = async () => {
    const res = await KomentarService.dohvatiKomentar(zadatak_id);
    return res.data;
  };

  return useQuery([key, zadatak_id], dohvatiKomentar, { ...options });
};

export { useFetchKomentari };
