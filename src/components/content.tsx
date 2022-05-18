import React, { useRef } from "react";

import { marked } from "marked";

enum contentActivedType {
  edit,
  preview,
}

type ChangeEventHandler = (value: string) => void;

export function Content(
  props: {
    activedType?: contentActivedType;
    defaultContent?: string;
    error?: string | null;
    onChange?: ChangeEventHandler | undefined;
  } = {
    activedType: contentActivedType.edit,
    defaultContent: "",
    error: null,
    onChange: undefined,
  }
) {
  const error = props.error;
  const contentRef = useRef<string>();
  contentRef.current = props.defaultContent ?? "";

  const [type, setType] = React.useState(
    props.activedType === undefined
      ? contentActivedType.edit
      : contentActivedType.preview
  );

  const activedStyle = "rounded-t-md border-x border-t border-primary";
  const editStyle = type === contentActivedType.edit ? activedStyle : "";
  const previewStyle = type === contentActivedType.preview ? activedStyle : "";

  function setTheType(newType: contentActivedType) {
    if (type == newType) {
      return;
    }
    setType(newType);
  }

  return (
    <div className="w-full">
      <div className="flex flex-row justify-end space-x-2">
        <button
          type="button"
          className={"px-3 py-2 " + editStyle}
          onClick={() => {
            setTheType(contentActivedType.edit);
          }}
        >
          编辑
        </button>
        <button
          type="button"
          className={"px-3 py-2 " + previewStyle}
          onClick={() => {
            setTheType(contentActivedType.preview);
          }}
        >
          预览
        </button>
      </div>
      {type === contentActivedType.edit ? (
        <textarea
          className={`w-full rounded-md p-2 tracking-wide outline-none ring-2 focus:ring-primary focus:ring-offset-2 ${
            error ? "ring-red-300" : ""
          }`}
          name="body"
          rows={20}
          placeholder="Content"
          required
          onChange={(event) => {
            const v = event.target.value;
            if (props.onChange) {
              props.onChange(v);
            }
            contentRef.current = v;
          }}
          defaultValue={contentRef.current}
          onKeyDown={keyDown}
        ></textarea>
      ) : (
        <div
          className="w-full rounded-md p-3 ring-1"
          dangerouslySetInnerHTML={{
            __html:
              type == contentActivedType.preview
                ? marked(contentRef.current)
                : "",
          }}
        ></div>
      )}
    </div>
  );

  function keyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Tab") {
      event.preventDefault();
      const indent = "        ";
      const e = event.currentTarget;
      const start = e.selectionStart;
      e.value =
        e.value.substring(0, start) +
        indent +
        e.value.substring(e.selectionEnd);
      e.selectionEnd = e.selectionStart = start + indent.length;
    }
  }
}
