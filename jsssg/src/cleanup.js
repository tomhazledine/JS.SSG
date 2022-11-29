export const cleanup = ({ args, PATHS, config }) => {
    if (args.images) {
        if (args.verbose) console.log(`Removing stale build files...`);
        fs.rmSync(PATHS.OUT, { recursive: true, force: true });
    } else {
        if (args.verbose)
            console.log(`Removing stale build files (but keeping images)...`);
        const allBuildFiles = readFolder(PATHS.OUT);
        const nonImageBuildFiles = allBuildFiles.filter(
            filePath => !filePath.includes(config.images)
        );
        nonImageBuildFiles.map(filePath => fs.rmSync(filePath));
    }
};
