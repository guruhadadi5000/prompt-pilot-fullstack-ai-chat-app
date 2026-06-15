import { assets } from "../assets/assets";
import moment from "moment";
import { useEffect, useRef } from "react";
import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-python";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-css";
import "../assets/prism.css";
import type { ChatMessage } from "../types/app";

import "prismjs/components/prism-markdown";

const markdownComponents: Components = {
  pre({ children }) {
    return <pre className="message-code-block">{children}</pre>;
  },
  code({ className, children, ...props }) {
    const isBlock = /language-(\w+)/.test(className || "");

    if (isBlock) {
      return (
        <code className={className} {...props}>
          {String(children).replace(/\n$/, "")}
        </code>
      );
    }

    return (
      <code className="message-inline-code" {...props}>
        {children}
      </code>
    );
  },
};

const Message = ({ message }: { message: ChatMessage }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;

    contentRef.current
      .querySelectorAll('code[class*="language-"]')
      .forEach((block) => Prism.highlightElement(block));
  }, [message.content]);

  return (
    <div>
      {message.role === "user" ? (
        <div className="flex items-center justify-end my-4 gap-2">
          <div className="flex flex-col gap-2 p-2 px-4 bg-slate-50 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md max-w-2xl">
            <p className="text-sm dark:text-primary">{message.content}</p>
            <span className="text-xs text-gray-400 dark:text-[#B1A6C0]">
              {moment(message.timestamp).fromNow()}
            </span>
          </div>
          <img src={assets.user_icon} alt="user" className="w-8 rounded-full" />
        </div>
      ) : (
        <div className="inline-flex flex-col gap-2 p-2 px-4 max-w-2xl bg-primary/20 dark:bg-[#57317C]/30 border border-[#80609F]/30 rounded-md my-4">
          {message.isImage ? (
            <img
              src={message.content}
              alt="Generated image"
              className="w-full max-w-md mt-2 rounded-md"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div
              ref={contentRef}
              className="message-markdown text-sm dark:text-primary"
            >
              <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {message.content}
              </Markdown>
            </div>
          )}
          <span className="text-xs text-gray-400 dark:text-[#B1A6C0]">
            {moment(message.timestamp).fromNow()}
          </span>
        </div>
      )}
    </div>
  );
};

export default Message;
