import * as http from 'http';

export enum StationList {
    BuddingeStation = "000007217",
    BuddingeStationBuddingevej = "008600690",
}

export interface DepartureBoardResponse {
    DepartureBoard: DepartureBoard;
}

export interface DepartureBoard {
    Departure: Departure[];
}

export type DepartureType = "EXB" | "BUS" | "S";

export interface Departure {
    name: string;
    type: DepartureType;
    stop: string,
    time: string,
    date: string,
    id: string,
    line: "300S" | "30E" | "6A" | "200S" | "250S" | "B",
    messages: string,
    finalStop: string,
    direction: string,
    JourneyDetailRef: {
        ref: string
    }
}

export const getDeparturesForStation = async (stationId: string): Promise<Departure[]> => {
    return new Promise<Departure[]>((resolve, reject) => {
        http.get(`http://xmlopen.rejseplanen.dk/bin/rest.exe/departureBoard?id=${stationId}&format=json`, response  => {

            let data = "";

            // A chunk of data has been recieved.
            response.on("data", chunk => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            response.on("end", () => {
                const parsedResponse = JSON.parse(data) as DepartureBoardResponse;
                const departures = parsedResponse.DepartureBoard && parsedResponse.DepartureBoard.Departure;
                resolve(departures || []);
            });
        })
        .on("error", error => {
            reject(error);
        });
    });
};