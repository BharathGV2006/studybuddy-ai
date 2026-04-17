import T "../types/profiles";
import ProfilesLib "../lib/profiles";

mixin (state : ProfilesLib.State) {
  public shared query ({ caller }) func getProfile() : async ?T.UserProfile {
    ProfilesLib.getProfile(state, caller);
  };

  public shared ({ caller }) func upsertProfile(input : T.UserProfileInput) : async T.UserProfile {
    ProfilesLib.upsertProfile(state, caller, input);
  };
};
