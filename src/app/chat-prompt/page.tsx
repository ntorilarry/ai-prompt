"use client";

import React, { ChangeEvent, useState } from "react";
import { ChatRequest } from "@/models/request/chat-request";
import { ChatService } from "@/services/chat-service";
import MainLayout from "@/shared/mainLayout";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader";
import { IoSend } from "react-icons/io5";

const ChatPrompt = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ChatRequest>({
    message: "",
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
      setFormData({ message: "" });
      router.push(`/chat-prompt/${response.data?.tag?.id}`);
    }

    setIsLoading(false);
  };
  return (
    <MainLayout>
      {/* Content */}
      <div className="h-[80vh] flex flex-col ">
        <div className="h-full flex  items-center flex-col justify-center">
          <div className=" max-w-4xl w-full text-center mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
              Welcome to Custom AI Prompt
            </h1>
            <p className="mt-3 text-gray-600">
              Your AI-powered copilot for the web
            </p>
          </div>

          {/* Search */}
          <div className="mt-10 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative">
              <input
                type="text"
                name="message"
                className="p-3 sm:p-4 block w-full border-2 border-gray-200 rounded-full sm:text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                placeholder="Ask me anything..."
                onChange={handleFormChanged}
              />
              <div className="absolute top-1/2 end-2 -translate-y-1/2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:text-gray-800 focus:outline-hidden focus:text-gray-800 bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
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
          {/* End Search */}
        </div>

        <footer className="mt-auto max-w-4xl text-center mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-gray-600">Built by Larry Ntori</p>
        </footer>
      </div>
      {/* End Content */}
    </MainLayout>
  );
};

export default ChatPrompt;
