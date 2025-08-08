"use client";

import { useState } from "react";
import {
  IoSend,
  IoMic,
  IoAttach,
  IoImage,
  IoCopy,
  IoShare,
  IoRefresh,
} from "react-icons/io5";
import { BiLike, BiDislike } from "react-icons/bi";
import MainLayout from "@/shared/mainLayout";

const ChatPrompt = () => {
  const [message, setMessage] = useState("");

  const chatMessages = [
    {
      type: "user",
      content: "hi",
    },
    {
      type: "ai",
      content: "How can we help?",
    },
    {
      type: "user",
      content: "I built you",
    },

    {
      type: "ai",
      content:
        "I know you built me, and I appreciate your effort! How can I assist you today?",
    },
  ];

  return (
    <MainLayout>
      <div className="flex-1 flex flex-col h-screen">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="py-10 lg:py-14">
            {/* Title */}
            <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto text-center">
              <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl ">
                Welcome to AI Prompt
              </h1>
              <p className="mt-3 text-gray-600">
                Your AI-powered web prompt assistant
              </p>
            </div>

            {/* Chat Messages */}
            <ul className="mt-16 space-y-5">
              {chatMessages.map((msg, index) => (
                <li
                  key={index}
                  className={`
                max-w-4xl py-2 px-4 sm:px-6 lg:px-8 mx-auto
                ${
                  msg.type === "user"
                    ? "flex justify-end"
                    : "flex gap-x-2 sm:gap-x-4"
                }
              `}
                >
                  {msg.type === "ai" && (
                    <>
                      {/* AI Avatar */}
                      <div className="shrink-0 size-9 rounded-full bg-gray-600 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          GPT
                        </span>
                      </div>

                      {/* AI Message */}
                      <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
                        <div className="space-y-3">
                          <p className="text-sm text-gray-800 ">
                            {msg.content}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap justify-between items-center">
                          <div className="flex  items-center gap-2">
                            <div className="inline-flex border border-gray-200 rounded-full p-0.5 ">
                              <button className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:outline-none ">
                                <BiLike className="shrink-0 size-4" />
                              </button>
                              <button className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:outline-none ">
                                <BiDislike className="shrink-0 size-4" />
                              </button>
                            </div>
                            <button className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 ">
                              <IoCopy className="shrink-0 size-4" />
                              Copy
                            </button>
                            <button className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 ">
                              <IoShare className="shrink-0 size-4" />
                              Share
                            </button>
                          </div>
                          <button className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 ">
                            <IoRefresh className="shrink-0 size-4" />
                            New answer
                          </button>
                        </div>
                      </div>
                    </>
                  )}

                  {msg.type === "user" && (
                    <div className="max-w-2xl  flex gap-x-2 sm:gap-x-2">
                      <div className="grow space-y-3 bg-gray-200 py-2 px-3 rounded-lg">
                        <p className="text-gray-800 text-sm">{msg.content}</p>
                      </div>
                      <span className="shrink-0 inline-flex items-center justify-center size-9 rounded-full bg-gray-600">
                        <span className="text-sm font-medium text-white">
                          AZ
                        </span>
                      </span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Input Area */}
        <div className="max-w-4xl mx-auto sticky bottom-0 z-10 p-3 sm:py-6 w-full">
          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="p-3 sm:p-4 pb-12 sm:pb-12 block w-full text-black bg-gray-100 border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Ask me anything..."
              rows={3}
            />

            {/* Toolbar */}
            <div className="absolute bottom-px inset-x-px p-2 rounded-b-lg bg-gray-100 ">
              <div className="flex flex-wrap justify-between items-center gap-2">
                {/* Left buttons */}
                <div className="flex items-center">
                  <button className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-white focus:outline-none focus:bg-white">
                    <IoImage className="shrink-0 size-4" />
                  </button>
                  <button className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-white focus:outline-none focus:bg-white">
                    <IoAttach className="shrink-0 size-4" />
                  </button>
                </div>

                {/* Right buttons */}
                <div className="flex items-center gap-x-1">
                  <button className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-white focus:outline-none focus:bg-white">
                    <IoMic className="shrink-0 size-4" />
                  </button>
                  <button className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                    <IoSend className="shrink-0 size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ChatPrompt;
