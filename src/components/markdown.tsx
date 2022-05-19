import ReactMarkdown from "react-markdown";

export function Markdown(props: any) {
  // const d = dark as { [key: string]: React.CSSProperties };
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          console.log(node.data);

          return (
            <div className="bg-gray-800 text-gray-200 flex flex-col my-1 rounded-lg px-2 py-1 pb-3">
              <div className="space-x-3 flex py-2">
                <span className="rounded-full w-3 h-3 bg-red-500"></span>
                <span className="rounded-full w-3 h-3 bg-yellow-400"></span>
                <span className="rounded-full w-3 h-3 bg-gray-400"></span>
              </div>
              <code {...props}>{children}</code>
            </div>
          );
        },
      }}
    >
      {props.children}
    </ReactMarkdown>
  );
}
