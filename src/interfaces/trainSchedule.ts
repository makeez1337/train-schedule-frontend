import { ITrain } from './train';
import { IStation } from './station';

export interface ITrainSchedule {
  id: number;
  arrive_time: string;
  departure_time: string;
  train: ITrain;
  station_from: IStation;
  station_to: IStation;
}

export interface ICreateTrainSchedule {
  departure_time: string;
  arrive_time: string;
  train_id: number;
  station_to_id: number;
  station_from_id: number;
}

export interface IUpdateTrainSchedule {
  departure_time: string;
  arrive_time: string;
  train_id: number;
  station_to_id: number;
  station_from_id: number;
}
