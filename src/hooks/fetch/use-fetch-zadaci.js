import { useQuery } from "react-query";
import { ZadaciService } from "../../modules/zadaci/zadaci.service";

const useFetchZadaci = ([key, grupa_id], options = {}) => {
  const dohvatiZadatke = async () => {
    const res = await ZadaciService.dohvatiZadatke(grupa_id);
    return res.data;
  };

  return useQuery([key, grupa_id], dohvatiZadatke, { ...options });
};

export { useFetchZadaci };
