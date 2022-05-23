import { marked } from "marked";
import { renderToString } from "react-dom/server";
import hljs from "highlight.js";
import { register } from "./highlight-register";

import "highlight.js/styles/github.css";
import "./highlight.css";

function headingStyle(text: string, level: 1 | 2 | 3 | 4 | 5 | 6) {
  switch (level) {
    case 1:
      return (
        <div id={text} className="text-4xl my-5 font-bold border-b pb-3">
          <a href={`#${text}`}>{text}</a>
        </div>
      );
    case 2:
      return (
        <div id={text} className="text-3xl my-4 font-bold border-b pb-3">
          <a href={`#${text}`}>{text}</a>
        </div>
      );
    case 3:
      return (
        <div id={text} className="text-2xl my-3 font-bold border-b pb-3">
          <a href={`#${text}`}>{text}</a>
        </div>
      );
    case 4:
      return (
        <div id={text} className="text-xl my-2 font-bold border-b pb-3">
          <a href={`#${text}`}>{text}</a>
        </div>
      );
    case 5:
      return (
        <div id={text} className="text-lg my-1 font-bold border-b pb-3">
          <a href={`#${text}`}>{text}</a>
        </div>
      );
    default:
      return (
        <div id={text} className=" border-b font-bold pb-3">
          <a href={`#${text}`}>{text}</a>
        </div>
      );
  }
}

const tokenizer = {
  code: (src: string) => {
    if (src.startsWith("```") && src.endsWith("```")) {
      const clearText = src.trim();
      const langGroups = clearText.match(/^```(?<lang>\w+\s)/);
      const lang = langGroups?.groups?.["lang"];
      return {
        type: "code",
        raw: src,
        text: clearText,
        lang,
        codeBlockStyle: "indented",
      };
    }
  },
} as marked.Tokenizer;

const walkTokens = (token: marked.Token) => {
  if (token.type === "html") {
    token.text = token.text.replace(/[<>&"]/g, (c) => {
      return { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c] ?? c;
    });
  }
};

const renderer = {
  heading: (
    text: string,
    level: 1 | 2 | 3 | 4 | 5 | 6,
    raw: string,
    slugger: marked.Slugger
  ) => {
    const headingBlock: JSX.Element = headingStyle(text, level);
    return renderToString(headingBlock);
  },
  code: (code: string, infoString: string, escaped: boolean) => {
    const language = (
      infoString ? infoString : "javascript"
    ).toLocaleLowerCase();
    register(hljs, language);
    const formatted = hljs.highlight(code, { language }).value;
    const codeBlock = (
      <div className="bg-gray-800 text-gray-200 flex flex-col my-1 rounded-lg px-3 py-1 pb-3">
        <div className="space-x-3 flex py-2">
          <span className="rounded-full w-3 h-3 bg-red-500"></span>
          <span className="rounded-full w-3 h-3 bg-yellow-400"></span>
          <span className="rounded-full w-3 h-3 bg-gray-400"></span>
        </div>
        <code dangerouslySetInnerHTML={{ __html: formatted }}></code>
      </div>
    );

    const html = renderToString(codeBlock);
    return html;
  },
  codespan: (code: string) => {
    const html = (
      <code className="bg-gray-800 text-orange-400 text-opacity-90 px-2 rounded-md">
        {code}
      </code>
    );
    return renderToString(html);
  },
  paragraph: (text: string) => {
    const ps = text.split("\n");
    const html = (
      <>
        {ps.map((t, index) => (
          <p
            key={index}
            className="my-3 indent-8 leading-10 text-xl"
            dangerouslySetInnerHTML={{ __html: t }}
          ></p>
        ))}
      </>
    );
    return renderToString(html);
  },
} as marked.Renderer;

marked.use({
  xhtml: true,
  tokenizer,
  walkTokens,
  renderer,
});

export function Markdown(props: any) {
  const html = marked(props.value);
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
}
