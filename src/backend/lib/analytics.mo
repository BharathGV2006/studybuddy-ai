import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Common "../types/common";
import T "../types/analytics";

module {
  public type State = {
    sessions : Map.Map<Common.UserId, List.List<T.StudySession>>;
    var nextId : Common.ResourceId;
  };

  public func newState() : State {
    {
      sessions = Map.empty<Common.UserId, List.List<T.StudySession>>();
      var nextId = 0;
    };
  };

  public func logSession(state : State, caller : Common.UserId, input : T.StudySessionInput) : T.StudySession {
    let id = state.nextId;
    state.nextId += 1;
    let session : T.StudySession = {
      id;
      owner = caller;
      startedAt = input.startedAt;
      durationSeconds = input.durationSeconds;
      aiAssisted = input.aiAssisted;
      subject = input.subject;
    };
    let list = switch (state.sessions.get(caller)) {
      case (?existing) existing;
      case null {
        let fresh = List.empty<T.StudySession>();
        state.sessions.add(caller, fresh);
        fresh;
      };
    };
    list.add(session);
    session;
  };

  public func getSummary(state : State, caller : Common.UserId) : T.AnalyticsSummary {
    let allSessions = switch (state.sessions.get(caller)) {
      case (?list) list.toArray();
      case null [];
    };
    var totalDuration : Nat = 0;
    var aiSeconds : Nat = 0;
    for (s in allSessions.values()) {
      totalDuration += s.durationSeconds;
      if (s.aiAssisted) {
        aiSeconds += s.durationSeconds;
      };
    };
    {
      totalSessions = allSessions.size();
      totalDurationSeconds = totalDuration;
      aiAssistedSeconds = aiSeconds;
      soloSeconds = totalDuration - aiSeconds;
      sessions = allSessions;
    };
  };

  public func listSessions(state : State, caller : Common.UserId) : [T.StudySession] {
    switch (state.sessions.get(caller)) {
      case (?list) list.toArray();
      case null [];
    };
  };
};
