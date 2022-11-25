import watch from "node-watch";
import readline from "readline";

export const initWatch = (PATHS, build, config) => {
    const changed = (_, file) => {
        log(`File changed: ${file}`, "yellow");
        build();
    };

    const pathsToWatch = [
        PATHS.IN
        // PATHS.TEMPLATES
    ];

    console.log(`Watching for changes on "${config.in}"`);
    watch(pathsToWatch, { recursive: true }, changed);

    console.log(`Press "q" to exit`);
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on("keypress", (str, key) => {
        if (key.name === "q") {
            process.exit();
        }
    });
};
