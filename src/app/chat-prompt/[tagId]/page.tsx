"use client";

import { ChangeEvent, useEffect, useState } from "react";
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
import { ChatRequest } from "@/models/request/chat-request";
import { ChatService } from "@/services/chat-service";
import toast from "react-hot-toast";
import Loader from "@/components/loader";
import { useParams } from "next/navigation";
import { listTagHistoryResponse } from "@/models/response/chat-response";
import { useAuth } from "@/contexts/auth-context";

const ChatPromptList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const tagId = Array.isArray(params.tagId) ? params.tagId[0] : params.tagId; // normalize to string
  const { user } = useAuth();

  const [formData, setFormData] = useState<ChatRequest>({
    message: "",
    tagId: tagId,
  });

  const handleFormChanged = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    const response = await ChatService.createChat(formData);

    if (response.error) {
      toast.error(response.error);
    } else if (response.data?.message) {
      toast.success(response.data.message);
      setFormData({ message: "" });
      fetchChatHistory();
    }

    setIsLoading(false);
  };

  const [chatHistory, setChatHistory] = useState<listTagHistoryResponse[]>([]);

  const fetchChatHistory = async () => {
    setIsLoading(true);
    try {
      const response = await ChatService.getTagChatHistory(tagId || "");

      if (response.data && response.meta) {
        setChatHistory(Array.isArray(response.data) ? response.data : []);
      }

      console.log("Fetched Tags:", response.data);
    } catch (error) {
      console.error("Failed to fetch tags:", error);
      // Optionally set some error state here
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);
  return (
    <MainLayout>
      <div className="flex-1 flex flex-col h-screen">
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="py-10 lg:py-14">
            {/* Chat Messages */}
            <ul className="mt-16 space-y-5">
              {chatHistory.map((msg, index) => (
                <div key={index}>
                  {/* User Message (right) */}
                  {msg.message && (
                    <li className="max-w-4xl py-2 px-4 sm:px-6 lg:px-8 mx-auto flex justify-end">
                      <div className="max-w-2xl flex gap-x-2 sm:gap-x-2">
                        <div className="grow space-y-3 bg-gray-200 py-2 px-3 rounded-lg">
                          <p className="text-gray-800 text-sm">{msg.message}</p>
                        </div>

                        <img
                          className="h-9 w-9 shrink-0 rounded-full bg-gray-50"
                          src={`https://ui-avatars.com/api/?name=${user?.name}&background=random&size=40`}
                          alt=""
                        />
                      </div>
                    </li>
                  )}

                  {/* AI Reply (left) */}
                  {msg.reply && (
                    <li className="max-w-4xl py-2 px-4 sm:px-6 lg:px-8 mx-auto flex gap-x-2 sm:gap-x-4">
                      {/* AI Avatar */}
                      <div className="shrink-0 size-9 rounded-full bg-gray-600 flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          GPT
                        </span>
                      </div>

                      {/* AI Message */}
                      <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
                        <div className="space-y-3">
                          <p className="text-sm text-gray-800">{msg.reply}</p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap justify-between items-center">
                          <div className="flex items-center gap-2">
                            <div className="inline-flex border border-gray-200 rounded-full p-0.5">
                              <button className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800">
                                <BiLike className="shrink-0 size-4" />
                              </button>
                              <button className="inline-flex shrink-0 justify-center items-center size-8 rounded-full text-gray-500 hover:bg-blue-100 hover:text-blue-800">
                                <BiDislike className="shrink-0 size-4" />
                              </button>
                            </div>
                            <button className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-500 hover:bg-gray-50">
                              <IoCopy className="shrink-0 size-4" /> Copy
                            </button>
                            <button className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-500 hover:bg-gray-50">
                              <IoShare className="shrink-0 size-4" /> Share
                            </button>
                          </div>
                          <button className="py-2 px-3 inline-flex items-center gap-x-2 text-sm rounded-full text-gray-500 hover:bg-gray-50">
                            <IoRefresh className="shrink-0 size-4" /> New answer
                          </button>
                        </div>
                      </div>
                    </li>
                  )}
                </div>
              ))}
            </ul>
          </div>
        </div>

        {/* Input Area */}
        <div className="max-w-4xl mx-auto sticky bottom-0 z-10 p-3 sm:py-6 w-full">
          <div className="relative">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleFormChanged}
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
                  <button
                    onClick={handleSubmit}
                    className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                  >
                    {isLoading ? (
                      <Loader />
                    ) : (
                      <IoSend className="shrink-0 size-3.5" />
                    )}
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

export default ChatPromptList;
