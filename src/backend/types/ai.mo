module {
  public type ChatMessage = {
    role : Text;
    content : Text;
  };

  public type AskGeminiResult = {
    #ok : Text;
    #err : Text;
  };
};
