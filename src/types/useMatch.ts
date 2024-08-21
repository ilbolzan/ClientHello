export interface MatchType {
  id: string;
  category: string;
  runnerA: RacerType;
  runnerB: RacerType | false;
  tournament: string;
  winner: string;
};
export interface RacerType {
  id?: string;
  name: string;
  average_speed?: number;
  wos?: number;
  times_played?: number;
  victories?: number;
  category?: string;
  tournament?: string;
  dead?: boolean;
  key?: string;
};
export interface TournamentType {
  id?: string;
  title?: string;
  createdAt: Date;
  updatedAt?: Date;
  racers?: RacerType[];
};
export interface KeysType {
  category: string;
  current_race?: string;
  current_round?: string;
  graph?: MatchType[][];
  tournament: string;
};
