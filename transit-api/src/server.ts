import * as http from "http";
import { getDashboardData } from "./dashboardService";

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer(async (request, response) => {
    if (request.url === "/departures") {
        if (request.method === "GET") {
            try  {
                const data = await getDashboardData();
                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json");
                response.end(JSON.stringify(data));
            } catch (error) {
                console.error(JSON.stringify(error));
                response.statusCode = 404;
                response.setHeader("Content-Type", "application/json");
                response.end(`{ message: "Something went wrong." }`);
            }
        } else {
            response.statusCode = 405;
            response.setHeader("Content-Type", "application/json");
            response.setHeader("Allow", "GET");
            response.end(`{ message: "Method not allowed" }`);
        }
    } else {
        response.statusCode = 404;
        response.setHeader("Content-Type", "application/json");
        response.end(`{ message: "Not found" }`);
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});