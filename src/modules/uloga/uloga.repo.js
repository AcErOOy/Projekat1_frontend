import { api } from "../../lib";

const DOMAIN = "/projekat_backend/logika/";

const UlogaRepo = {
  getById: (id) => {
    return api.get(`${DOMAIN}dohvati_ulogu_po_id.php?id=${id}`);
  },
  getAll: () => {
    return api.get(`${DOMAIN}dohvati_sve_uloge.php`);
  },
};

export { UlogaRepo };
