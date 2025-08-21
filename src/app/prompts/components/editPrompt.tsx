"use client";

import { Modal } from "@/components/modal";
import { useAuth } from "@/contexts/auth-context";
import { editPromptRequest } from "@/models/request/prompt-request";
import { PromptService } from "@/services/prompt-service";
import React, { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface EditPromptProps {
  open: boolean;
  onClose: () => void;
  selectedPrompt: any;
}

const EditPrompt: React.FC<EditPromptProps> = ({
  open,
  onClose,
  selectedPrompt,
}) => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<editPromptRequest>({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (selectedPrompt) {
      setFormData({
        title: selectedPrompt?.title,
        content: selectedPrompt?.content,
      });
    }
  }, [selectedPrompt]);

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
    const response = await PromptService.updatePrompt(
      selectedPrompt?._id,
      formData,
      token || ""
    );

    if (response.error) {
      toast.error(response.error);
    } else if (response.data?.message) {
      toast.success(response.data?.message);
    }

    setIsLoading(false);
  };

  return (
    <div>
      {" "}
      <Modal
        open={open}
        onClose={onClose}
        title="Edit Prompt"
        buttons={[
          {
            label: "Cancel",
            onClick: onClose,
            className: "bg-red-500 text-white hover:bg-red-600",
          },
          {
            label: "Save Changes",
            type: "submit",
            onClick: handleSubmit,
            className: "bg-[#129D93] hover:bg-[#129D93]/80 text-white",
          },
        ]}
      >
        <form>
          <div className="my-3">
            <label className="block text-sm  ">Title</label>
            <input
              name="title"
              type="text"
              placeholder="Enter name"
              value={formData.title}
              onChange={handleFormChanged}
              required
              className="mt-2 border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg  focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
            />
          </div>

          <div className="my-3">
            <label className="block text-sm  ">Content</label>
            <textarea
              name="content"
              placeholder="Enter description"
              value={formData.content}
              onChange={handleFormChanged}
              rows={3}
              required
              className="mt-2 border block w-full px-4 py-3 placeholder-gray-500 border-gray-300 rounded-lg  focus:ring-indigo-600 focus:border-indigo-600 sm:text-sm caret-indigo-600"
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EditPrompt;
