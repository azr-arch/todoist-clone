import React, { useState, useRef, useEffect } from "react";

// implement this
function TaskInput({ defaultValue = "", name = "taskInput" }) {
    const [inputValue, setInputValue] = useState(defaultValue);
    const inputRef = useRef<HTMLDivElement>(null);

    const handleChange = () => {
        if (inputRef.current) {
            setInputValue(inputRef.current.innerText);
        }
    };

    const renderTextWithLabels = (text: string) => {
        const parts = text.split(/(@\w+\s|\n)/g);
        return parts.map((part, index) => {
            if (part.match(/@\w+\s/)) {
                return part;
            }
            return part;
        });
    };

    const setCaretPosition = (el: HTMLElement) => {
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(el);
        range.collapse(false);
        sel?.removeAllRanges();
        sel?.addRange(range);
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.innerHTML = "";
            console.log({ inputValue });
            renderTextWithLabels(inputValue).forEach((node) => {
                console.log({ node });
                const span = document.createElement("span");
                span.innerHTML = typeof node === "string" ? node : "";
                console.log(checkIfItIsLabel(span.innerText));
                if (checkIfItIsLabel(span.innerText)) {
                    span.className = "bg-red-500";
                }

                inputRef.current.appendChild(span);
            });

            // inputValue.split(" ").map((word) => {
            //     if (!inputRef.current) return;
            //     const span = document.createElement("span");
            //     span.innerText = word;
            //     if (word[0] === "@") {
            //         span.className = "bg-yellow-400";
            //     }
            //     inputRef.current.appendChild(span);
            // });
            // Set caret position after rendering text
            setCaretPosition(inputRef.current);
        }
    }, [inputValue]);

    return (
        <div className="w-full">
            <div
                ref={inputRef}
                contentEditable
                onInput={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md min-h-[40px]"
                data-placeholder="Type your task here..."
            />
            <input type="hidden" name={name} value={inputValue} />
        </div>
    );
}

export default TaskInput;

function checkIfItIsLabel(text: string) {
    return text.split(" ").some((val) => val[0] === "@");
}
