import Common "../types/common";
import T "../types/flashcards";
import FlashcardsLib "../lib/flashcards";

mixin (state : FlashcardsLib.State) {
  public shared query ({ caller }) func listDecks() : async [T.FlashcardDeck] {
    FlashcardsLib.listDecks(state, caller);
  };

  public shared query ({ caller }) func getDeck(id : Common.ResourceId) : async ?T.FlashcardDeck {
    FlashcardsLib.getDeck(state, caller, id);
  };

  public shared ({ caller }) func createDeck(input : T.FlashcardDeckInput) : async T.FlashcardDeck {
    FlashcardsLib.createDeck(state, caller, input);
  };

  public shared ({ caller }) func updateDeck(id : Common.ResourceId, input : T.FlashcardDeckInput) : async ?T.FlashcardDeck {
    FlashcardsLib.updateDeck(state, caller, id, input);
  };

  public shared ({ caller }) func deleteDeck(id : Common.ResourceId) : async Bool {
    FlashcardsLib.deleteDeck(state, caller, id);
  };
};
