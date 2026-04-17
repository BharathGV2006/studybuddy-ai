import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Common "../types/common";
import T "../types/profiles";

module {
  public type State = {
    profiles : Map.Map<Common.UserId, T.UserProfile>;
  };

  public func newState() : State {
    {
      profiles = Map.empty<Common.UserId, T.UserProfile>();
    };
  };

  public func getProfile(state : State, caller : Common.UserId) : ?T.UserProfile {
    state.profiles.get(caller);
  };

  public func upsertProfile(state : State, caller : Common.UserId, input : T.UserProfileInput) : T.UserProfile {
    let now = Time.now();
    let profile : T.UserProfile = switch (state.profiles.get(caller)) {
      case (?existing) {
        { existing with
          name = input.name;
          studyGoals = input.studyGoals;
          onboardingComplete = input.onboardingComplete;
          updatedAt = now;
        };
      };
      case null {
        {
          owner = caller;
          name = input.name;
          studyGoals = input.studyGoals;
          onboardingComplete = input.onboardingComplete;
          createdAt = now;
          updatedAt = now;
        };
      };
    };
    state.profiles.add(caller, profile);
    profile;
  };
};
