import { HLJSApi } from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import csharp from "highlight.js/lib/languages/csharp";
import xml from "highlight.js/lib/languages/xml";
import swift from "highlight.js/lib/languages/swift";
import json from "highlight.js/lib/languages/json";
import java from "highlight.js/lib/languages/java";
import "highlight.js/styles/github.css";

import "./highlight.css";

export function register(hljs: HLJSApi, languageName: string) {
  switch (languageName) {
    case "css":
      hljs.registerLanguage("css", css);
      break;
    case "c#":
      hljs.registerLanguage("c#", csharp);
      break;
    case "csharp":
      hljs.registerLanguage("csharp", csharp);
      break;
    case "html":
      hljs.registerLanguage("html", xml);
      break;
    case "xml":
      hljs.registerLanguage("xml", xml);
      break;
    case "dart":
      hljs.registerLanguage("dart", swift);
      break;
    case "json":
      hljs.registerLanguage("json", json);
      break;
    case "java":
      hljs.registerLanguage("java", java);
      break;
    default:
      hljs.registerLanguage("javascript", javascript);
      break;
  }
}
