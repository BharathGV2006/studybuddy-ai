import T "../types/analytics";
import AnalyticsLib "../lib/analytics";

mixin (state : AnalyticsLib.State) {
  public shared ({ caller }) func logSession(input : T.StudySessionInput) : async T.StudySession {
    AnalyticsLib.logSession(state, caller, input);
  };

  public shared query ({ caller }) func getAnalyticsSummary() : async T.AnalyticsSummary {
    AnalyticsLib.getSummary(state, caller);
  };

  public shared query ({ caller }) func listSessions() : async [T.StudySession] {
    AnalyticsLib.listSessions(state, caller);
  };
};
