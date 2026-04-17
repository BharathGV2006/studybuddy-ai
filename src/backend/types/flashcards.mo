import Common "common";

module {
  public type Flashcard = {
    id : Common.ResourceId;
    question : Text;
    answer : Text;
  };

  public type FlashcardDeck = {
    id : Common.ResourceId;
    owner : Common.UserId;
    title : Text;
    subject : Text;
    cards : [Flashcard];
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type FlashcardDeckInput = {
    title : Text;
    subject : Text;
    cards : [Flashcard];
  };
};
