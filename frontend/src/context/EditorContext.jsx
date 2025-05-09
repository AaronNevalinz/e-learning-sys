/* eslint-disable react-refresh/only-export-components */
import { createContext, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import AlignmentTune from "editor-js-alignment-tune";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import CodeTool from "@rxpm/editor-js-code";
import EditorjsList from "@editorjs/list";
import Quote from "@editorjs/quote";

export const EditorContext = createContext();

// eslint-disable-next-line react/prop-types
export const EditorContextProvider = ({ children }) => {
  const editorInstanceRef = useRef(null);
  const initEditor = () => {
    const editor = new EditorJS({
      holder: "editorjs",
      placeholder: "Start Typing...",
      tools: {
        paragraph: {
          class: Paragraph,
          tunes: ["alignmentTune"],
        },
        list: {
          class: EditorjsList,
          inlineToolbar: true,
          config: {
            defaultStyle: "unordered",
          },
        },
        quote: Quote,
        header: {
          class: Header,
          tunes: ["alignmentTune"],
          config: {
            placeholder: "Enter a header",
            levels: [1, 2, 3, 4, 5],
            defaultLevel: 2,
            defaultAlignment: "center",
          },
        },
        alignmentTune: {
          class: AlignmentTune,
          config: {
            default: "left",
            blocks: {
              header: {
                default: "left",
                availableAlignments: ["left", "center", "right"],
              },
              paragraph: "justify",
            },
          },
        },
        code: {
          class: CodeTool,
          config: {
            modes: {
              php: "php",
              js: "JavaScript",
              py: "Python",
              cpp: "C++",
              md: "Markdown",
            },
            defaultMode: "php",
          },
        },
      },
    });
    editorInstanceRef.current = editor;
  };
  return (
    <EditorContext.Provider value={{ initEditor, editorInstanceRef }}>
      {children}
    </EditorContext.Provider>
  );
};
