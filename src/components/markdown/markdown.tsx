import { marked } from "marked";
import { renderToString } from "react-dom/server";
import hljs from "highlight.js";
import { register } from "./highlight-register";

function headingStyle(text: string, level: 1 | 2 | 3 | 4 | 5 | 6) {
  switch (level) {
    case 1:
      return <div className="text-4xl my-5 font-bold">{text}</div>;
    case 2:
      return <div className="text-3xl my-4 font-bold">{text}</div>;
    case 3:
      return <div className="text-2xl my-3 font-bold">{text}</div>;
    case 4:
      return <div className="text-xl my-2 font-bold">{text}</div>;
    case 5:
      return <div className="text-lg my-1 font-bold">{text}</div>;
    default:
      return <div className="font-bold">{text}</div>;
  }
}

const renderer = {
  heading: (
    text: string,
    level: 1 | 2 | 3 | 4 | 5 | 6,
    raw: string,
    slugger: any
  ) => {
    const headingBlock = headingStyle(text, level);
    return renderToString(headingBlock);
  },
  code: (code: string, infoString: string, escaped: boolean) => {
    const language = (
      infoString ? infoString : "javascript"
    ).toLocaleLowerCase();
    register(hljs, language);
    const formatted = hljs.highlight(code, { language }).value;
    const codeBlock = (
      <div className="bg-gray-800 text-gray-200 flex flex-col my-1 rounded-lg px-2 py-1 pb-3">
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
} as marked.Renderer;

marked.use({
  renderer,
});

export function Markdown(props: any) {
  const html = marked(props.value);
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
}
