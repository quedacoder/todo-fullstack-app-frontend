import axios from "axios";

class AuthenticationService {
    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem("authenticatedUser", username);
        this.setupAxiosInterceptors(
            this.getBasicAuthorizationHeader(username, password)
        );
    }

    getBasicAuthorizationHeader(username, password) {
        return "Basic " + window.btoa(username + ":" + password);
    }

    executeBasicAuthenticationService(username, password) {
        return axios.get("http://localhost:8080/basicauth", {
            headers: {
                authorization: this.getBasicAuthorizationHeader(username, password),
            },
        });
    }

    executeJwtAuthenticationService(username, password) {
        return axios.post("http://localhost:8080/authenticate", {
            username,
            password,
        });
    }

    registerSuccessfulLoginForJwt(username, token) {
        sessionStorage.setItem("authenticatedUser", username);
        this.setupAxiosInterceptors(this.createJWTToken(token));
    }

    createJWTToken(token) {
        return "Bearer " + token;
    }

    logout() {
        sessionStorage.removeItem("authenticatedUser");
    }

    isUserLoggedIn() {
        let username = sessionStorage.getItem("authenticatedUser");

        if (username === null) {
            return false;
        } else {
            return true;
        }
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem("authenticatedUser");
        if (user === null) return "";
        return user;
    }

    setupAxiosInterceptors(basicAuthorization) {
        axios.interceptors.request.use((config) => {
            if (this.isUserLoggedIn()) {
                config.headers.authorization = basicAuthorization;
            }
            return config;
        });
    }
}

export default new AuthenticationService();