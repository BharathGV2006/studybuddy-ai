import Common "common";

module {
  public type StudySession = {
    id : Common.ResourceId;
    owner : Common.UserId;
    startedAt : Common.Timestamp;
    durationSeconds : Nat;
    aiAssisted : Bool;
    subject : Text;
  };

  public type StudySessionInput = {
    startedAt : Common.Timestamp;
    durationSeconds : Nat;
    aiAssisted : Bool;
    subject : Text;
  };

  public type AnalyticsSummary = {
    totalSessions : Nat;
    totalDurationSeconds : Nat;
    aiAssistedSeconds : Nat;
    soloSeconds : Nat;
    sessions : [StudySession];
  };
};
