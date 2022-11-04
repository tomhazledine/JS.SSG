import { Server } from "node-static";
import http from "http";

export const server = (buildPath, port) => {
    const file = new Server(buildPath);

    http.createServer(function (request, response) {
        request
            .addListener("end", function () {
                // Serve files!
                file.serve(request, response);
            })
            .resume();
    }).listen(port);
};
