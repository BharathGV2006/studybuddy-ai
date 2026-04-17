import StudySetsLib "lib/studysets";
import FlashcardsLib "lib/flashcards";
import AnalyticsLib "lib/analytics";
import ProfilesLib "lib/profiles";
import StudySetsApi "mixins/studysets-api";
import FlashcardsApi "mixins/flashcards-api";
import AnalyticsApi "mixins/analytics-api";
import ProfilesApi "mixins/profiles-api";

actor {
  let studySetsState = StudySetsLib.newState();
  let flashcardsState = FlashcardsLib.newState();
  let analyticsState = AnalyticsLib.newState();
  let profilesState = ProfilesLib.newState();

  include StudySetsApi(studySetsState);
  include FlashcardsApi(flashcardsState);
  include AnalyticsApi(analyticsState);
  include ProfilesApi(profilesState);
};
