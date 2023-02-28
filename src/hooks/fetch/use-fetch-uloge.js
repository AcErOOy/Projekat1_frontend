import { useQuery } from "react-query";
import { UlogaService } from "../../modules";

const useFetchUloge = (key, options = {}) => {
  const getAll = async () => {
    const res = await UlogaService.getAll();
    return res.data;
  };
  return useQuery(key, getAll, { ...options });
};

export { useFetchUloge };
