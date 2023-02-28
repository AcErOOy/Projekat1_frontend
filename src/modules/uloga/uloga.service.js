import { UlogaRepo } from "./uloga.repo";

const UlogaService = {
  getById: (id) => {
    return UlogaRepo.getById(id);
  },
  getAll: () => {
    return UlogaRepo.getAll();
  },
};

export { UlogaService };
