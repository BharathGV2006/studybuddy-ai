import Common "common";

module {
  public type UserProfile = {
    owner : Common.UserId;
    name : Text;
    studyGoals : [Text];
    onboardingComplete : Bool;
    createdAt : Common.Timestamp;
    updatedAt : Common.Timestamp;
  };

  public type UserProfileInput = {
    name : Text;
    studyGoals : [Text];
    onboardingComplete : Bool;
  };
};
