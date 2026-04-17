module {
  public type AuthError = {
    #InvalidCredentials;
    #EmailAlreadyExists;
    #NotAuthenticated;
    #InternalError : Text;
  };

  public type LoginResult = {
    #ok;
    #err : AuthError;
  };

  public type RegisterResult = {
    #ok;
    #err : AuthError;
  };
};
