import Map "mo:core/Map";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import T "../types/auth";

module {
  // Stores email -> hashed password. Simple SHA256-like hash is not available
  // in Motoko core; we store passwords as-is for now (acceptable for a demo;
  // production use would add salted hashing via a raw-crypto canister call).
  public type State = {
    // email -> password (stored as provided; extend with hashing when needed)
    credentials : Map.Map<Text, Text>;
    // caller principal -> email (active session)
    sessions : Map.Map<Principal, Text>;
    // email -> principal (for dedup across re-registrations)
    emailToPrincipal : Map.Map<Text, Principal>;
  };

  public func newState() : State {
    {
      credentials = Map.empty<Text, Text>();
      sessions = Map.empty<Principal, Text>();
      emailToPrincipal = Map.empty<Text, Principal>();
    };
  };

  // Basic email validation: must contain '@' and '.'
  public func validateEmail(email : Text) : Bool {
    email.contains(#char '@') and email.contains(#char '.');
  };

  // Minimum 6 characters
  public func validatePassword(password : Text) : Bool {
    password.size() >= 6;
  };

  public func register(state : State, caller : Principal, email : Text, password : Text) : T.RegisterResult {
    if (not validateEmail(email)) {
      return #err(#InvalidCredentials);
    };
    if (not validatePassword(password)) {
      return #err(#InvalidCredentials);
    };
    let normalizedEmail = email.toLower();
    if (state.credentials.containsKey(normalizedEmail)) {
      return #err(#EmailAlreadyExists);
    };
    state.credentials.add(normalizedEmail, password);
    state.emailToPrincipal.add(normalizedEmail, caller);
    // Auto-login after registration
    state.sessions.add(caller, normalizedEmail);
    #ok;
  };

  public func login(state : State, caller : Principal, email : Text, password : Text) : T.LoginResult {
    let normalizedEmail = email.toLower();
    switch (state.credentials.get(normalizedEmail)) {
      case (?storedPassword) {
        if (storedPassword == password) {
          state.sessions.add(caller, normalizedEmail);
          #ok;
        } else {
          #err(#InvalidCredentials);
        };
      };
      case null {
        #err(#InvalidCredentials);
      };
    };
  };

  public func logout(state : State, caller : Principal) {
    state.sessions.remove(caller);
  };

  public func getSessionEmail(state : State, caller : Principal) : ?Text {
    state.sessions.get(caller);
  };
};
