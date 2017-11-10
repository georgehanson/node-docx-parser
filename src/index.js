const ArgumentResolver = require("./ArgumentResolver");

if (!ArgumentResolver.hasAllRequiredArguments()) {
    console.log("Please ensure you pass the --file, --output and --data flags.");
    return;
}