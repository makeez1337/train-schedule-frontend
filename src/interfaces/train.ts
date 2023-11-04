export enum TrainType {
  passenger = 'passenger',
  high_speed = 'high_speed',
}

export interface ITrain {
  id: number;
  name: string;
  type: TrainType;
  capacity: number;
}

export interface ICreateTrain {
  name: string;
  type: TrainType;
  capacity: number;
}
