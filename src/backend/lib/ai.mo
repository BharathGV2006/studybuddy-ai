import T "../types/ai";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Char "mo:core/Char";

module {
  public type State = {};

  public func newState() : State {
    {};
  };

  // Escape special characters for JSON string values
  func escapeJson(s : Text) : Text {
    var result = "";
    for (c in s.chars()) {
      let code = c.toNat32();
      if (code == 92) {         // backslash
        result := result # "\\\\";
      } else if (code == 34) {  // double-quote
        result := result # "\\\"";
      } else if (code == 10) {  // newline
        result := result # "\\n";
      } else if (code == 13) {  // carriage return
        result := result # "\\r";
      } else if (code == 9) {   // tab
        result := result # "\\t";
      } else {
        result := result # Text.fromChar(c);
      };
    };
    result;
  };

  // Build a single content entry for the Gemini request
  func buildContent(role : Text, text : Text) : Text {
    "{\"role\":\"" # escapeJson(role) # "\",\"parts\":[{\"text\":\"" # escapeJson(text) # "\"}]}";
  };

  // Builds the JSON request body for the Gemini REST API
  public func buildGeminiRequestBody(history : [T.ChatMessage], message : Text) : Text {
    // Map history messages (role: "user" | "model")
    let historyParts : [Text] = history.map<T.ChatMessage, Text>(func(msg : T.ChatMessage) : Text {
      // Gemini uses "model" for assistant role; map "assistant" -> "model"
      let role = if (msg.role == "assistant") "model" else msg.role;
      buildContent(role, msg.content);
    });

    let newUserContent = buildContent("user", message);

    // Build contents JSON string from history + new message
    var contentsJson = "";
    var first = true;
    for (part in historyParts.vals()) {
      if (first) {
        contentsJson := part;
        first := false;
      } else {
        contentsJson := contentsJson # "," # part;
      };
    };
    if (first) {
      contentsJson := newUserContent;
    } else {
      contentsJson := contentsJson # "," # newUserContent;
    };

    "{\"contents\":[" # contentsJson # "],\"generationConfig\":{\"temperature\":0.7,\"maxOutputTokens\":1024}}";
  };

  // Extract text from: {"candidates":[{"content":{"parts":[{"text":"..."}],...},...}],...}
  // Simple parser — locates the first "text":" occurrence and extracts until the closing quote
  public func parseGeminiResponse(responseBody : Text) : T.AskGeminiResult {
    let marker = "\"text\":\"";
    switch (findSubstring(responseBody, marker)) {
      case null {
        // Check for error field
        let errMarker = "\"message\":\"";
        switch (findSubstring(responseBody, errMarker)) {
          case null { #err("Failed to parse Gemini response: " # responseBody) };
          case (?startIdx) {
            let afterMarker = startIdx + errMarker.size();
            let errText = extractJsonString(responseBody, afterMarker);
            #err("Gemini API error: " # errText);
          };
        };
      };
      case (?startIdx) {
        let afterMarker = startIdx + marker.size();
        let extracted = extractJsonString(responseBody, afterMarker);
        if (extracted.size() == 0) {
          #err("Empty response from Gemini");
        } else {
          #ok(unescapeJson(extracted));
        };
      };
    };
  };

  // Find first occurrence of substring in text, return char offset
  func findSubstring(haystack : Text, needle : Text) : ?Nat {
    let haystackChars = haystack.toArray();
    let needleChars = needle.toArray();
    let hLen = haystackChars.size();
    let nLen = needleChars.size();
    if (nLen == 0 or nLen > hLen) return null;
    var i = 0;
    label search while (i + nLen <= hLen) {
      var j = 0;
      var matched = true;
      label inner while (j < nLen) {
        if (haystackChars[i + j] != needleChars[j]) {
          matched := false;
        };
        j += 1;
      };
      if (matched) return ?i;
      i += 1;
    };
    null;
  };

  // Extract a JSON string value starting at offset (after the opening quote)
  func extractJsonString(text : Text, startOffset : Nat) : Text {
    let chars = text.toArray();
    let len = chars.size();
    var i = startOffset;
    var result = "";
    var escaped = false;
    label extract while (i < len) {
      let c = chars[i];
      let code = c.toNat32();
      if (escaped) {
        result := result # Text.fromChar(c);
        escaped := false;
      } else if (code == 92) {  // backslash
        result := result # "\\";
        escaped := true;
      } else if (code == 34) {  // double-quote — end of string
        return result;
      } else {
        result := result # Text.fromChar(c);
      };
      i += 1;
    };
    result;
  };

  // Unescape JSON escape sequences for display
  func unescapeJson(s : Text) : Text {
    var result = "";
    var escaped = false;
    for (c in s.chars()) {
      let code = c.toNat32();
      if (escaped) {
        if (code == 110) {       // 'n'
          result := result # "\n";
        } else if (code == 114) { // 'r'
          result := result # "\r";
        } else if (code == 116) { // 't'
          result := result # "\t";
        } else if (code == 34) {  // '"'
          result := result # "\"";
        } else if (code == 92) {  // '\\'
          result := result # "\\";
        } else {
          result := result # "\\" # Text.fromChar(c);
        };
        escaped := false;
      } else if (code == 92) {    // backslash
        escaped := true;
      } else {
        result := result # Text.fromChar(c);
      };
    };
    result;
  };
};
