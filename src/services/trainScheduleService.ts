import { axiosService } from './axiosService';
import {
  ICreateTrainSchedule,
  ITrainSchedule,
  IUpdateTrainSchedule,
} from '../interfaces/trainSchedule';
import { SortParams } from '../interfaces/sortParams';

export const trainScheduleService = {
  get: (sortParams: SortParams | undefined): Promise<ITrainSchedule[]> =>
    axiosService
      .get('train-schedule', { params: sortParams })
      .then((res) => res.data),
  create: (data: ICreateTrainSchedule) =>
    axiosService.post('train-schedule', data).then((res) => res.data),
  findById: (id: string): Promise<ITrainSchedule> =>
    axiosService.get(`train-schedule/${id}`).then((res) => res.data),
  updateById: (id: string, data: IUpdateTrainSchedule) =>
    axiosService.put(`train-schedule/${id}`, data).then((res) => res.data),
  deleteById: (id: string) =>
    axiosService.delete(`train-schedule/${id}`).then((res) => res.data),
};
