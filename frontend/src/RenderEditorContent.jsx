/* eslint-disable react/prop-types */
/* eslint-disable no-case-declarations */
import { useEffect, useRef } from "react";
import { toast } from "sonner";

const RenderEditorContent = ({ data, title }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      containerRef.current = document.createElement("div");
    }

    const container = document.getElementById("content-container");
    if (container) {
      container.innerHTML = "";
      container.appendChild(containerRef.current);
    }

    if (!data || !data.blocks) {
      containerRef.current.innerHTML = "<p>Select a subtopic</p>";
      return;
    }

    containerRef.current.innerHTML = "";

    if (title) {
      const titleElement = document.createElement("h1");
      titleElement.className = "text-3xl font-semibold mb-2";
      titleElement.textContent = title;
      containerRef.current.appendChild(titleElement);
    }

    data.blocks.forEach((block) => {
      let blockElement;
      switch (block.type) {
        case "header":
          const HeaderTag = `h${block.data.level}`;
          blockElement = document.createElement(HeaderTag);
          blockElement.className = "text-slate-700";
          blockElement.innerHTML = block.data.text;
          break;
        case "paragraph":
          blockElement = document.createElement("p");
          blockElement.className = "text-slate-700 leading-7 py-3";
          blockElement.innerHTML = block.data.text;
          break;
        case "code":
          blockElement = document.createElement("div"); // Wrap code and button
          blockElement.className = "relative group"; // Make relative for absolute positioning
          const preElement = document.createElement("pre");
          preElement.className =
            "w-full bg-black/90 rounded-md text-slate-200 px-8 py-6 my-2 overflow-x-auto"; // Added overflow-x-auto
          const codeElement = document.createElement("code");
          codeElement.textContent = block.data.code;
          preElement.appendChild(codeElement);
          blockElement.appendChild(preElement);

          const copyButton = document.createElement("button");
          copyButton.className = `
            absolute top-2 right-2
            opacity-0 group-hover:opacity-100
            bg-gray-200 hover:bg-gray-300
            text-gray-900 rounded-md p-1 transition-opacity
            z-10 cursor-pointer 
          `; // Added z-index
          copyButton.title = "Copy code to clipboard";
          copyButton.addEventListener("click", () => {
            navigator.clipboard.writeText(block.data.code);
            toast.success("Code-block copied to clipBoard");
          });

          // Use React component inside the button.  Important.
          const copyIcon = document.createElement("div");
          copyIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
</svg>
`;
          copyButton.appendChild(copyIcon);
          blockElement.appendChild(copyButton);
          break;
        case "list":
          blockElement = document.createElement(
            block.data.style === "ordered" ? "ol" : "ul"
          );
          blockElement.className = "list-disc list-inside ml-5 text-slate-700 py-3";
          block.data.items.forEach((item) => {
            const listItem = document.createElement("li");
            if (typeof item === "object" && item.content) {
              listItem.innerHTML = item.content;
            } else {
              listItem.innerHTML = typeof item === "string" ? item : JSON.stringify(item);
            }
            blockElement.appendChild(listItem);
          });
          break;

        case "quote":
          blockElement = document.createElement("blockquote");
          blockElement.className = "border-l-4 border-gray-300 pl-4 my-4";
          const quoteText = document.createElement("p");
          quoteText.className = "text-gray-700 italic";
          quoteText.innerHTML = block.data.text;
          const quoteCaption = document.createElement("cite");
          quoteCaption.className = "block text-gray-500 mt-2";
          quoteCaption.textContent = block.data.caption;
          blockElement.appendChild(quoteText);
          blockElement.appendChild(quoteCaption);
          break;
        default:
          return;
      }
      containerRef.current.appendChild(blockElement);
    });
  }, [data, title]);

  return <div id="content-container" />;
};

export default RenderEditorContent;
