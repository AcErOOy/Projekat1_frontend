import { useQuery } from "react-query";
import { GrupaZadatakaService } from "../../modules";

const useFetchGrupe = (key, options = {}) => {
  const dohvatiGrupe = async () => {
    const res = await GrupaZadatakaService.dohvatiGrupe();
    return res.data;
  };
  return useQuery(key, dohvatiGrupe, { ...options });
};

export { useFetchGrupe };
