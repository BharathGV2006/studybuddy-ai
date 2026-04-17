import Common "common";

module {
  public type QuizQuestion = {
    id : Common.ResourceId;
    question : Text;
    options : [Text];
    correctIndex : Nat;
  };

  public type StudySet = {
    id : Common.ResourceId;
    owner : Common.UserId;
    title : Text;
    subject : Text;
    aiSummary : Text;
    quizQuestions : [QuizQuestion];
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type StudySetInput = {
    title : Text;
    subject : Text;
    aiSummary : Text;
    quizQuestions : [QuizQuestion];
  };
};
