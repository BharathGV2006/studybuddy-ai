import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Common "../types/common";
import T "../types/studysets";

module {
  public type State = {
    studySets : Map.Map<Common.UserId, List.List<T.StudySet>>;
    var nextId : Common.ResourceId;
  };

  public func newState() : State {
    {
      studySets = Map.empty<Common.UserId, List.List<T.StudySet>>();
      var nextId = 0;
    };
  };

  public func listStudySets(state : State, caller : Common.UserId) : [T.StudySet] {
    switch (state.studySets.get(caller)) {
      case (?list) list.toArray();
      case null [];
    };
  };

  public func getStudySet(state : State, caller : Common.UserId, id : Common.ResourceId) : ?T.StudySet {
    switch (state.studySets.get(caller)) {
      case (?list) list.find(func(s) { s.id == id });
      case null null;
    };
  };

  public func createStudySet(state : State, caller : Common.UserId, input : T.StudySetInput) : T.StudySet {
    let now = Time.now();
    let id = state.nextId;
    state.nextId += 1;
    let newSet : T.StudySet = {
      id;
      owner = caller;
      title = input.title;
      subject = input.subject;
      aiSummary = input.aiSummary;
      quizQuestions = input.quizQuestions;
      createdAt = now;
      updatedAt = now;
    };
    let list = switch (state.studySets.get(caller)) {
      case (?existing) existing;
      case null {
        let fresh = List.empty<T.StudySet>();
        state.studySets.add(caller, fresh);
        fresh;
      };
    };
    list.add(newSet);
    newSet;
  };

  public func updateStudySet(state : State, caller : Common.UserId, id : Common.ResourceId, input : T.StudySetInput) : ?T.StudySet {
    switch (state.studySets.get(caller)) {
      case (?list) {
        var updated : ?T.StudySet = null;
        list.mapInPlace(func(s) {
          if (s.id == id) {
            let u : T.StudySet = { s with
              title = input.title;
              subject = input.subject;
              aiSummary = input.aiSummary;
              quizQuestions = input.quizQuestions;
              updatedAt = Time.now();
            };
            updated := ?u;
            u;
          } else s;
        });
        updated;
      };
      case null null;
    };
  };

  public func deleteStudySet(state : State, caller : Common.UserId, id : Common.ResourceId) : Bool {
    switch (state.studySets.get(caller)) {
      case (?list) {
        let sizeBefore = list.size();
        let kept = list.filter(func(s) { s.id != id });
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
