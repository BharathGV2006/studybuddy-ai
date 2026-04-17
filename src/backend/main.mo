import StudySetsLib "lib/studysets";
import FlashcardsLib "lib/flashcards";
import AnalyticsLib "lib/analytics";
import ProfilesLib "lib/profiles";
import AuthLib "lib/auth";
import StudySetsApi "mixins/studysets-api";
import FlashcardsApi "mixins/flashcards-api";
import AnalyticsApi "mixins/analytics-api";
import ProfilesApi "mixins/profiles-api";
import AuthApi "mixins/auth-api";
import AiApi "mixins/ai-api";

actor {
  let studySetsState = StudySetsLib.newState();
  let flashcardsState = FlashcardsLib.newState();
  let analyticsState = AnalyticsLib.newState();
  let profilesState = ProfilesLib.newState();
  let authState = AuthLib.newState();

  include StudySetsApi(studySetsState);
  include FlashcardsApi(flashcardsState);
  include AnalyticsApi(analyticsState);
  include ProfilesApi(profilesState);
  include AuthApi(authState);
  include AiApi();
};
