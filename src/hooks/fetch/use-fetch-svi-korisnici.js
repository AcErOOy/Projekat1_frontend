import { useQuery } from "react-query";
import { KorisnikService } from "../../modules";

const useFetchSveKorisnike = (key, options = {}) => {
  const dohvatiKorinikeIUloge = async () => {
    const res = await KorisnikService.dohvatiKorinikeIUloge();
    return res.data;
  };
  return useQuery(key, dohvatiKorinikeIUloge, { ...options });
};

export { useFetchSveKorisnike };