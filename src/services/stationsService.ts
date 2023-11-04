import { axiosService } from './axiosService';
import { ICreateStation, IStation } from '../interfaces/station';

export const stationsService = {
  findAll: (): Promise<IStation[]> =>
    axiosService.get('stations').then((res) => res.data),
  create: (data: ICreateStation): Promise<void> =>
    axiosService.post('stations', data).then((res) => res.data),
};
