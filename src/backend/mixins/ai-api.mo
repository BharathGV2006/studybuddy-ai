import T "../types/ai";
import AiLib "../lib/ai";

// AI mixin — proxies chat messages to Google Gemini via IC HTTP outcalls.
// Uses the IC management canister http_request method for HTTPS calls.
mixin () {
  // IC management canister actor for HTTP outcalls
  let ic = actor "aaaaa-aa" : actor {
    http_request : shared ({
      url : Text;
      max_response_bytes : ?Nat64;
      method : { #get; #head; #post };
      headers : [{ name : Text; value : Text }];
      body : ?Blob;
      transform : ?{
        function : shared query ({ response : { status : Nat; headers : [{ name : Text; value : Text }]; body : Blob }; context : Blob }) -> async { status : Nat; headers : [{ name : Text; value : Text }]; body : Blob };
        context : Blob;
      };
      is_replicated : ?Bool;
    }) -> async { status : Nat; headers : [{ name : Text; value : Text }]; body : Blob };
  };

  // Gemini API key (injected via environment at deploy time via dfx.json/canister args,
  // or set here as a placeholder — replace with your actual key at deployment).
  // In production, store this in a separate config canister or environment variable.
  let geminiApiKey = "GEMINI_API_KEY";
  let geminiModel = "gemini-2.0-flash";

  // Send a message to Gemini with optional conversation history.
  public shared ({ caller }) func askGemini(history : [T.ChatMessage], message : Text) : async T.AskGeminiResult {
    let requestBody = AiLib.buildGeminiRequestBody(history, message);
    let bodyBlob = requestBody.encodeUtf8();

    let url = "https://generativelanguage.googleapis.com/v1beta/models/" # geminiModel # ":generateContent?key=" # geminiApiKey;

    let response = try {
      await ic.http_request({
        url = url;
        max_response_bytes = ?(262144 : Nat64); // 256 KB
        method = #post;
        headers = [
          { name = "Content-Type"; value = "application/json" },
          { name = "Accept"; value = "application/json" },
        ];
        body = ?bodyBlob;
        transform = null;
        is_replicated = ?false;
      });
    } catch (e) {
      return #err("Network error calling Gemini API");
    };

    if (response.status < 200 or response.status >= 300) {
      let errorBody = switch (response.body.decodeUtf8()) {
        case (?t) t;
        case null "Unknown error";
      };
      return #err("Gemini API returned status " # debug_show(response.status) # ": " # errorBody);
    };

    switch (response.body.decodeUtf8()) {
      case (?responseText) {
        AiLib.parseGeminiResponse(responseText);
      };
      case null {
        #err("Failed to decode Gemini API response");
      };
    };
  };
};
