class AuthenticationService {
    registerSuccessfulLogin(username, password) {
        sessionStorage.setItem("authenticatedUser", username);
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
}

export default new AuthenticationService();