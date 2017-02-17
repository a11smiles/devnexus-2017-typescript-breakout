export default class Config {
    public port: number;

    constructor() {
        this.port = process.env.PORT || 8080;
    }
}