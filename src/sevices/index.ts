import { PersistentCollection } from "signaldb"
import { RacerType, TournamentType } from '../types/useMatch';
import * as apiConfig from "./apiConfig";
import { v4 as uuidv4 } from 'uuid';


const tournamentsDb = new PersistentCollection("tournaments");

type CredentialsType = {
  email: string;
  password: string;
};
type PlayerDeleteType = {
  key: string;
};
type RaceType = {
  winner: string;
  key: string;
};

export const login = async ({ email, password }: CredentialsType) => {
  const dataSend = {
    email,
    password,
  };
  try {
    const response = await apiConfig.sendWithAxios("token", "POST", dataSend);
    return response.data;
  } catch {
    throw new Error("erro ao logar");
  }
};
export const getTournaments = async (): Promise<TournamentType> => {
  try {
    const cursor = tournamentsDb.find({});
    const response = cursor.fetch();
    console.log(response);
    return response as TournamentType[];
  } catch (e: any) {
    console.log(e);
    throw new Error("erro ao obter torneios");
  }
};
export const getTournament = async (id: string): Promise<TournamentType> => {
  try {
    const response = tournamentsDb.findOne({id});
    console.log(response);
    return response
  } catch (e: any) {
    console.log(e);
    throw new Error(`erro ao obter torneio [${id}]`);
  }
};
export const postTournaments = async (dataTournament: TournamentType) => {
  try {
    dataTournament.createdAt = new Date();
    dataTournament.racers = [];
    console.log(dataTournament);
    return await tournamentsDb.insert(dataTournament);
  } catch (e: any) {
    console.log(e);
    throw new Error("erro ao criar torneio");
  }
};
export const deletTournaments = async (id: string) => {
  try {
    return await tournamentsDb.removeOne({id});
  } catch (e: any) {
    console.log(e);
    throw new Error("erro ao criar torneio");
  }
};

export const postPlayer = async (dataPlayer: RacerType, tournmentId: string) => {
  try {
    dataPlayer.id = uuidv4();
    const savedTournment =  tournamentsDb.updateOne({id: tournmentId}, { $push: {racers: dataPlayer}})
    console.log(savedTournment);
    return savedTournment;
  } catch (e: any) {
    console.log(e);
    throw new Error("erro ao criar jogador");
  }
};
export const putPlayer = async (dataPlayer: RacerType, tournmentId: string) => {
  try {
    const response = await apiConfig.sendWithAxiosNoCode(
      "92lifkj4demkm16tk5jc3vaj78pdmawx",
      "PUT",
      { player: dataPlayer },
      { tournament: tournmentId }
    );
    return response.data;
  } catch {
    throw new Error("erro ao atualizar jogador");
  }
};
export const deletePlayer = async (
  dataPlayer: RacerType,
  tournmentId: string
) => {
  try {
    console.log(dataPlayer);
    const savedTournment =  tournamentsDb.updateOne({id: tournmentId}, { $pull: {racers: {id: dataPlayer.id}}})
    console.log(savedTournment);
    return savedTournment;
  } catch (e: any) {
    console.log(e);
    throw new Error("erro ao deleter jogador");
  }
};
export const getTournamentKeys = async (id: string, category: string) => {
  try {
    const response = await apiConfig.sendWithAxiosNoCode(
      "xkqbcdm7if1d7c3r9r75j1rjsc1wdxb9?category=" + category,
      "GET",
      null,
      { tournament: id }
    );
    return response.data;
  } catch {
    throw new Error("erro ao carregar chaves");
  }
};
export const createTournamentKeys = async (id: string, category: string) => {
  try {
    const response = await apiConfig.sendWithAxiosNoCode(
      "xkqbcdm7if1d7c3r9r75j1rjsc1wdxb9",
      "POST",
      { category },
      { tournament: id }
    );
    return response.data;
  } catch {
    throw new Error("erro ao carregar chaves");
  }
};
export const updateTournamentKeys = async (id: string, category: string) => {
  try {
    const response = await apiConfig.sendWithAxiosNoCode(
      "xkqbcdm7if1d7c3r9r75j1rjsc1wdxb9",
      "PUT",
      { category },
      { tournament: id }
    );
    return response.data;
  } catch {
    throw new Error("erro ao carregar chaves");
  }
};

export const getRace = async (race: string, id: string) => {
  try {
    const response = await apiConfig.sendWithAxiosNoCode(
      "eog0rhpyfy4a7kefggoyrvc5l2rh2nty?key=" + race,
      "GET",
      null,
      { tournament: id }
    );
    return response.data;
  } catch {
    throw new Error("erro ao carregar corrida");
  }
};
export const getRacer = async (racer: string, id: string) => {
  try {
    const response = await apiConfig.sendWithAxiosNoCode(
      "92lifkj4demkm16tk5jc3vaj78pdmawx?key=" + racer,
      "GET",
      null,
      { tournament: id }
    );
    return response.data;
  } catch {
    throw new Error("erro ao carregar corrida");
  }
};

export const putPlayers = async (
  dataPlayer: RacerType[],
  id: string
) => {
  try {
    const response = await apiConfig.sendWithAxiosNoCode(
      "92lifkj4demkm16tk5jc3vaj78pdmawx",
      "PUT",
      { players: dataPlayer },
      { tournament: id }
    );
    return response.data;
  } catch {
    throw new Error("erro ao atualizar jogador");
  }
};
export const putRace = async (race: RaceType, id: string) => {
  try {
    const response = await apiConfig.sendWithAxiosNoCode(
      "eog0rhpyfy4a7kefggoyrvc5l2rh2nty",
      "PUT",
      race,
      { tournament: id }
    );
    return response.data;
  } catch {
    throw new Error("erro ao atualizar corrida");
  }
};
