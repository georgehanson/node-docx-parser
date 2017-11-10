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

    getFile() {
        return this.args.file;
    }

    dataIsValid() {
        try {
            return typeof this.getData() === 'object';
        } catch (e) {
            return false;
        }
    }

    getData() {
        return JSON.parse(this.args.data);
    }

    outputFileName() {
        return this.args.output;
    }
}

module.exports = new ArgumentResolver;