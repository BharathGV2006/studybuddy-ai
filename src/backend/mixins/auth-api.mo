import T "../types/auth";
import AuthLib "../lib/auth";

// Auth mixin — provides email/password register, login, logout
// backed by in-canister credential storage (AuthLib.State).
mixin (authState : AuthLib.State) {
  // Register a new user with email and password.
  public shared ({ caller }) func register(email : Text, password : Text) : async T.RegisterResult {
    AuthLib.register(authState, caller, email, password);
  };

  // Log in with email and password.
  public shared ({ caller }) func login(email : Text, password : Text) : async T.LoginResult {
    AuthLib.login(authState, caller, email, password);
  };

  // Log out the current user session.
  public shared ({ caller }) func logout() : async () {
    AuthLib.logout(authState, caller);
  };
};
