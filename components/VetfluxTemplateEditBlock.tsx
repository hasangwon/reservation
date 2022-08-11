import _ from "lodash";
import React, { useContext, useEffect, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

// import { toast } from "@/atoms/toastify/ToastManager";
// import { MessageTemplateContext } from "@/context/messageTemplate/messageTemplateContext";

let textAreaCurrentIndex: number;
let focusTextAreaKeyword: string | undefined;
const VetFluxTemplateEditBlock = ({ label, message, description, actions, onChangeEvent }: { label: any; message: string; description: string; actions: Array<string>; onChangeEvent: (value: string) => void }) => {
  const [inputValue, setInputValue] = useState(message);
  const textAreaRef = useRef(null);
  const handleOnChangeEvent = (event: any) => {
    setInputValue(event.target.value);
    onChangeEvent(event.target.value);
  };
  useEffect(() => {
    setInputValue(message);
  }, [message]);
  const handleOnClickEvent = {
    addText: (event: any) => {
      const { keyword, action } = event.target.dataset;
      const addText = `[${action}]`;
      if (window.getSelection) {
        let startNumber = textAreaRef.current.selectionStart;
        // const endNumber = ele.selectionEnd;
        if (startNumber === 0) {
          startNumber = textAreaRef.current.value.length;
        }
        const strOriginal = textAreaRef.current.value;
        const strFront = textAreaRef.current.value.substring(0, startNumber);
        const strEnd = textAreaRef.current.value.substring(startNumber, strOriginal.length);
        const newText = strFront + addText + strEnd;
        setInputValue(newText);
        onChangeEvent(newText);
        textAreaRef.current.focus();
        if (keyword !== focusTextAreaKeyword) return;
        if (textAreaCurrentIndex) {
          const cursorIndex = textAreaCurrentIndex + addText.length;
          console.log(cursorIndex);
          textAreaCurrentIndex = cursorIndex;
          setTimeout(() => {
            textAreaRef.current.setSelectionRange(cursorIndex, cursorIndex);
          }, 200);
        } else {
          console.log("null");
        }
      }
    },
    textAreaClick: (event: any) => {
      // setTimeout(() => {
      const { target } = event;
      const selector = target as HTMLTextAreaElement;
      textAreaCurrentIndex = selector.selectionStart;
      focusTextAreaKeyword = selector.dataset.keyword;
      // }, 1000);
    },
  };
  return (
    <div className="mt-10">
      <div className="flex flex-row justify-between items-center h-[25px]">
        <h3 className="text-[16px] font-bold mr-4 text-neutral-dark">{label}</h3>
        <ul className="flex flex-row flex-1 h-[2.125rem]">
          {actions.length > 0 &&
            actions.map((action, index) => {
              return (
                <li key={index.toString()} className="bg-[#f5f6fa] text-[#6c5ce7] text-sm leading-[2.125rem] rounded-2xl px-4 ml-4 hover:cursor-pointer hover:bg-primary hover:text-white">
                  <button onClick={handleOnClickEvent.addText} data-keyword={label} data-action={action}>
                    + {action}
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="mt-4 editor">
        <TextareaAutosize
          ref={textAreaRef}
          key={label}
          onChange={handleOnChangeEvent}
          onClick={handleOnClickEvent.textAreaClick}
          minRows={3}
          data-keyword={label}
          className="w-full text-neutral-dark bg-[#f5f6fa] border-0 resize-none p-5 overflow-auto focus-visible:outline-none editor rounded-md"
          value={inputValue}
        />
        <div className="flex flex-row my-4 text-[#b0aebc] ">
          <p className={"whitespace-pre-wrap text-sm"}>{description}</p>
        </div>
      </div>
    </div>
  );
};
export default VetFluxTemplateEditBlock;
