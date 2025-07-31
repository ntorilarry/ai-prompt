"use client"

import { useState } from "react"
import { IoSend, IoMic, IoAttach, IoImage, IoCopy, IoShare, IoRefresh } from "react-icons/io5"
import { BiLike, BiDislike } from "react-icons/bi"

export default function ChatArea() {
  const [message, setMessage] = useState("")

  const chatMessages = [
    {
      type: "ai",
      content: "How can we help?",
      suggestions: ["What's Preline UI?", "How many Starter Pages & Examples are there?", "Is there a PRO version?"],
    },
    {
      type: "user",
      content: "what's preline ui?",
    },
    {
      type: "ai",
      content:
        "Preline UI is an open-source set of prebuilt UI components based on the utility-first Tailwind CSS framework.",
      links: [
        { label: "Installation Guide", href: "#" },
        { label: "Framework Guides", href: "#" },
      ],
    },
    {
      type: "user",
      content: "what's preline ui figma?",
    },

  ]

  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="py-10 lg:py-14">
          {/* Title */}
          <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto text-center">
            <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">Welcome to Preline AI</h1>
            <p className="mt-3 text-gray-600 dark:text-neutral-400">Your AI-powered copilot for the web</p>
          </div>

          {/* Chat Messages */}
          <ul className="mt-16 space-y-5">
            {chatMessages.map((msg, index) => (
              <li
                key={index}
                className={`
                max-w-4xl py-2 px-4 sm:px-6 lg:px-8 mx-auto
                ${msg.type === "user" ? "flex justify-end" : "flex gap-x-2 sm:gap-x-4"}
              `}
              >
                {msg.type === "ai" && (
                  <>
                    {/* AI Avatar */}
                    <div className="shrink-0 size-9 rounded-full bg-blue-600 flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      </div>
                    </div>

                    {/* AI Message */}
                    <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
                      <div className="space-y-3">
                        <p className="text-sm text-gray-800 dark:text-white">{msg.content}</p>

                        {msg.suggestions && (
                          <div className="space-y-1.5">
                            <p className="mb-1.5 text-sm text-gray-800 dark:text-white">You can ask questions like:</p>
                            <ul className="list-disc list-outside space-y-1.5 ps-3.5">
                              {msg.suggestions.map((suggestion, i) => (
                                <li key={i} className="text-sm text-gray-800 dark:text-white">
                                  {suggestion}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {msg.links && (
                          <div className="space-y-1.5">
                            <p className="text-sm text-gray-800 dark:text-white">Here are some links to get started</p>
                            <ul>
                              {msg.links.map((link, i) => (
                                <li key={i}>
                                  <a
                                    href={link.href}
                                    className="text-sm text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500 dark:hover:text-blue-400"
                                  >
                                    {link.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

               
                      </div>

                      {/* Action Buttons */}
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="inline-flex border border-gray-200 rounded-full p-0.5 dark:border-neutral-700">
                            <button className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:outline-none dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200">
                              <BiLike className="shrink-0 size-4" />
                            </button>
                            <button className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800 focus:outline-none dark:text-neutral-500 dark:hover:bg-blue-900 dark:hover:text-blue-200">
                              <BiDislike className="shrink-0 size-4" />
                            </button>
                          </div>
                          <button className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                            <IoCopy className="shrink-0 size-4" />
                            Copy
                          </button>
                          <button className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                            <IoShare className="shrink-0 size-4" />
                            Share
                          </button>
                        </div>
                        <button className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-500 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                          <IoRefresh className="shrink-0 size-4" />
                          New answer
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {msg.type === "user" && (
                  <div className="max-w-2xl flex gap-x-2 sm:gap-x-4">
                    <span className="shrink-0 inline-flex items-center justify-center size-9 rounded-full bg-gray-600">
                      <span className="text-sm font-medium text-white">AZ</span>
                    </span>
                    <div className="grow mt-2 space-y-3">
                      <p className="text-gray-800 dark:text-neutral-200">{msg.content}</p>
                    </div>
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
            className="p-3 sm:p-4 pb-12 sm:pb-12 block w-full bg-gray-100 border-gray-200 rounded-lg sm:text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600 resize-none"
            placeholder="Ask me anything..."
            rows={3}
          />

          {/* Toolbar */}
          <div className="absolute bottom-px inset-x-px p-2 rounded-b-lg bg-gray-100 dark:bg-neutral-800">
            <div className="flex flex-wrap justify-between items-center gap-2">
              {/* Left buttons */}
              <div className="flex items-center">
                <button className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-white focus:outline-none focus:bg-white dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                  <IoImage className="shrink-0 size-4" />
                </button>
                <button className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-white focus:outline-none focus:bg-white dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                  <IoAttach className="shrink-0 size-4" />
                </button>
              </div>

              {/* Right buttons */}
              <div className="flex items-center gap-x-1">
                <button className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-white focus:outline-none focus:bg-white dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
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
  )
}
