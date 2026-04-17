import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Common "../types/common";
import T "../types/flashcards";

module {
  public type State = {
    decks : Map.Map<Common.UserId, List.List<T.FlashcardDeck>>;
    var nextId : Common.ResourceId;
  };

  public func newState() : State {
    {
      decks = Map.empty<Common.UserId, List.List<T.FlashcardDeck>>();
      var nextId = 0;
    };
  };

  public func listDecks(state : State, caller : Common.UserId) : [T.FlashcardDeck] {
    switch (state.decks.get(caller)) {
      case (?list) list.toArray();
      case null [];
    };
  };

  public func getDeck(state : State, caller : Common.UserId, id : Common.ResourceId) : ?T.FlashcardDeck {
    switch (state.decks.get(caller)) {
      case (?list) list.find(func(d) { d.id == id });
      case null null;
    };
  };

  public func createDeck(state : State, caller : Common.UserId, input : T.FlashcardDeckInput) : T.FlashcardDeck {
    let now = Time.now();
    let id = state.nextId;
    state.nextId += 1;
    let newDeck : T.FlashcardDeck = {
      id;
      owner = caller;
      title = input.title;
      subject = input.subject;
      cards = input.cards;
      createdAt = now;
      updatedAt = now;
    };
    let list = switch (state.decks.get(caller)) {
      case (?existing) existing;
      case null {
        let fresh = List.empty<T.FlashcardDeck>();
        state.decks.add(caller, fresh);
        fresh;
      };
    };
    list.add(newDeck);
    newDeck;
  };

  public func updateDeck(state : State, caller : Common.UserId, id : Common.ResourceId, input : T.FlashcardDeckInput) : ?T.FlashcardDeck {
    switch (state.decks.get(caller)) {
      case (?list) {
        var updated : ?T.FlashcardDeck = null;
        list.mapInPlace(func(d) {
          if (d.id == id) {
            let u : T.FlashcardDeck = { d with
              title = input.title;
              subject = input.subject;
              cards = input.cards;
              updatedAt = Time.now();
            };
            updated := ?u;
            u;
          } else d;
        });
        updated;
      };
      case null null;
    };
  };

  public func deleteDeck(state : State, caller : Common.UserId, id : Common.ResourceId) : Bool {
    switch (state.decks.get(caller)) {
      case (?list) {
        let sizeBefore = list.size();
        let kept = list.filter(func(d) { d.id != id });
        if (kept.size() < sizeBefore) {
          list.clear();
          list.append(kept);
          true;
        } else false;
      };
      case null false;
    };
  };
};
