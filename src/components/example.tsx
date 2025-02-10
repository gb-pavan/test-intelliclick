import React, { useRef } from "react";

const QuestionForm: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);

  const insertElement = (html: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    const fragment = document.createDocumentFragment();
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }

    range.deleteContents();
    range.insertNode(fragment);

    // Ensure lastChild exists before setting cursor position
    if (fragment.lastChild) {
      range.setStartAfter(fragment.lastChild);
      range.setEndAfter(fragment.lastChild);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };


  const insertLog = () => {
    insertElement(
      ` log(<span contentEditable style="border-bottom: 1px dashed gray;"> </span>) `
    );
  };

  const insertIntegral = () => {
    insertElement(
      ` ∫ <input type="text" style="width: 40px; margin: 0 5px;" autofocus /> `
    );
  };

  const insertDefIntegral = () => {
    insertElement(
      `<span style="display: inline-flex; align-items: center; margin: 0 5px;">
        <span style="display: flex; flex-direction: column; align-items: center;">
          <input type="text" placeholder="Upper" style="width: 40px; margin-bottom: 3px;" />
          <span style="font-size: 20px; margin: 0 5px;">∫</span>
          <input type="text" placeholder="Lower" style="width: 40px; margin-top: 3px;" />
        </span>
        <input type="text" placeholder="f(x)" style="width: 60px; margin-left: 5px;" autofocus />
      </span>`
    );
  };

  return (
    <div>
      <h2>Question Paper Editor</h2>
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        style={{
          border: "1px solid black",
          minHeight: "50px",
          padding: "10px",
          cursor: "text",
          whiteSpace: "pre-wrap",
        }}
      />
      <br />
      <button onClick={insertLog}>log</button>
      <button onClick={insertIntegral}>∫ Integral</button>
      <button onClick={insertDefIntegral}>∫ Definite Integral</button>
    </div>
  );
};

export default QuestionForm;