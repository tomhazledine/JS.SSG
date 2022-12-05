import readline from "readline";

export const exit = () => {
    console.log(`Press "q" to exit`);
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    process.stdin.on("keypress", (str, key) => {
        if (key.name === "q") {
            process.exit();
        }
    });
};
