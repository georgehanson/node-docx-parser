class ArgumentResolver {
    constructor() {
        this.args = require('minimist')(process.argv.slice(2));
        this.requiredArguments = [
            "file",
            "output",
            "data"
        ];
    }

    hasAllRequiredArguments() {
        let passed = true;

        this.requiredArguments.forEach(item => {
            if (!this.args.hasOwnProperty(item)) {
                passed = false;
            }
        });

        return passed;
    }
}

module.exports = new ArgumentResolver;