import { getDeparturesForStation, StationList, Departure } from "./rejseplanen";

export interface DashboardData {
    lyngby: Partial<Departure>[],
    kobenhavn: Partial<Departure>[]
}

export const getDashboardData = async (): Promise<DashboardData> => {
    const departures = await getDeparturesForStation(StationList.BuddingeStation);

    const lyngby: Partial<Departure>[] = [];
    const kobenhavn: Partial<Departure>[] = [];

    let departure: Departure;
    for (let i = 0; i < departures.length; i++) {
        departure = departures[i];
        if (isLyngby(departure)) {
            lyngby.push(trimDeparture(departure));
        } else if (isKobenhavn(departure)) {
            kobenhavn.push(trimDeparture(departure));
        }
    }

    return {
        lyngby,
        kobenhavn,
    };
}

const isLyngby = (departure: Departure): boolean => {
    if (!departure) {
        return false;
    }

    return isLyngby300S(departure) || isLyngby30E(departure);
}

const isKobenhavn = (departure: Departure): boolean => {
    if (!departure) {
        return false;
    }

    return isKobenhavnB(departure) || isKobenhavn6A(departure);
}

const isLyngby300S = (departure: Departure): boolean => {
    if (departure.line !== "300S") {
        return false
    };

    if (departure.direction === "Gl. Holte Øverødvej" ||
        departure.direction === "Lyngby St."
    ) {
        return true;
    }

    return false;
}

const isLyngby30E = (departure: Departure): boolean => {
    if (departure.line !== "30E") {
        return false
    };

    if (departure.direction === "DTU, Bygning 119, Nordvej") {
        return true;
    }

    return false;
}

const isKobenhavn6A = (departure: Departure): boolean => {
    if (departure.line !== "6A") {
        return false
    };

    // Buddinge is the end destination, so all departures
    // are headed to the city
    return true;
}

const isKobenhavnB = (departure: Departure): boolean => {
    if (departure.line !== "B") {
        return false
    };

    if (departure.direction === "Høje Taastrup St.") {
        return true;
    }

    return false;
}

const trimDeparture = (departure: Departure): Partial<Departure> => {
    return {
        time: departure.time,
        line: departure.line,
        direction: departure.direction
            .replace('ø', 'oe')
            .replace('æ', 'ae')
            .replace('å', 'aa'),
    };
}
