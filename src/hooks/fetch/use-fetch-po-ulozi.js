import { useQuery } from "react-query";
import { KorisnikService } from "../../modules";

const useFetchPoUlozi = ([key, naziv], options = {}) => {
  const dohvatiKorisnikaPoUlozi = async () => {
    const res = await KorisnikService.dohvatiKorisnikaPoUlozi(naziv);
    return res.data;
  };
  return useQuery([key, naziv], dohvatiKorisnikaPoUlozi, { ...options });
};

export { useFetchPoUlozi };
