import Common "../types/common";
import T "../types/studysets";
import StudySetsLib "../lib/studysets";

mixin (state : StudySetsLib.State) {
  public shared query ({ caller }) func listStudySets() : async [T.StudySet] {
    StudySetsLib.listStudySets(state, caller);
  };

  public shared query ({ caller }) func getStudySet(id : Common.ResourceId) : async ?T.StudySet {
    StudySetsLib.getStudySet(state, caller, id);
  };

  public shared ({ caller }) func createStudySet(input : T.StudySetInput) : async T.StudySet {
    StudySetsLib.createStudySet(state, caller, input);
  };

  public shared ({ caller }) func updateStudySet(id : Common.ResourceId, input : T.StudySetInput) : async ?T.StudySet {
    StudySetsLib.updateStudySet(state, caller, id, input);
  };

  public shared ({ caller }) func deleteStudySet(id : Common.ResourceId) : async Bool {
    StudySetsLib.deleteStudySet(state, caller, id);
  };
};
