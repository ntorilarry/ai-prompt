"use client";

import { Modal } from "@/components/modal";
import { useAuth } from "@/contexts/auth-context";

import { PromptService } from "@/services/prompt-service";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface DeletePromptProps {
  open: boolean;
  onClose: () => void;
  selectedPrompt: any;
  fetchPrompts?: () => void;
}

const DeletePrompt: React.FC<DeletePromptProps> = ({
  open,
  onClose,
  selectedPrompt,
  fetchPrompts,
}) => {
  const { token } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsLoading(true);
    const response = await PromptService.deletePrompt(
      selectedPrompt?._id,
      token || ""
    );

    if (response.error) {
      toast.error(response.error);
    } else if (response.data?.message) {
      toast.success(response.data?.message);
      fetchPrompts?.();
      onClose();
    }

    setIsLoading(false);
  };

  return (
    <div>
      {" "}
      <Modal
        open={open}
        onClose={onClose}
        title="Delete Prompt"
        buttons={[
          {
            label: "Cancel",
            onClick: onClose,
            className: "bg-red-500 text-white hover:bg-red-600",
          },
          {
            label: "Delete",
            type: "submit",
            onClick: handleSubmit,
            className: "bg-[#129D93] hover:bg-[#129D93]/80 text-white",
          },
        ]}
      >
        <form>
          <p>Are you sure to delete this prompt?</p>
        </form>
      </Modal>
    </div>
  );
};

export default DeletePrompt;
