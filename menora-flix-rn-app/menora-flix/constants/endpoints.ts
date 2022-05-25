class Endpoint {
    private static serverBackendPrefix: string = "https://menora-flix-backend.herokuapp.com/api";

    public static favoritesEndpoint: string = `${this.serverBackendPrefix}/favorite`;
    public static recommendedMoviesEndpoint: string = `${this.serverBackendPrefix}/recommended`;
    public static newMoviesEndpoint: string = `${this.serverBackendPrefix}/new`;
    public static authenticateUserEndpoint: string = `${this.serverBackendPrefix}/authenticate-user`;

}

export default Endpoint;