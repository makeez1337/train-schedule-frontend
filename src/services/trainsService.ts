import { axiosService } from './axiosService';

import { ICreateTrain, ITrain } from '../interfaces/train';

export const trainsService = {
  findAll: (): Promise<ITrain[]> =>
    axiosService.get('trains').then((res) => res.data),
  create: (data: ICreateTrain) =>
    axiosService.post('trains', data).then((res) => res.data),
};
