import { useQuery } from "react-query";
import { UlogaService } from "../../modules";

const useFetchUloga = ([key, id], options = {}) => {
  const getById = async () => {
    const res = await UlogaService.getById(id);
    return res.data;
  };
  return useQuery([key, id], getById, { ...options });
};

export { useFetchUloga };
