"use client";

import { useAuth } from "@/contexts/auth-context";
import { PromptResponse } from "@/models/response/prompt-response";
import { PromptService } from "@/services/prompt-service";
import MainLayout from "@/shared/mainLayout";
import React, { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import CreatePrompt from "./components/createPrompt";
import DataTableHeader from "@/components/dataTableHeader";
import DataTableBody from "@/components/dataTableBody";
import { ColumnDef } from "@tanstack/react-table";
import { RiEditCircleLine } from "react-icons/ri";
import EditPrompt from "./components/editPrompt";
import DeletePrompt from "./components/deletePrompt";

const Prompt = () => {
  const { user } = useAuth();
  const [prompts, setPrompts] = useState<PromptResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptResponse | null>(
    null
  );

  const fetchPrompts = async () => {
    if (!user?.id ) return; // Also check for token
    setIsLoading(true);
    try {
      const response = await PromptService.getUserPrompts({
        page: currentPage,
        size: 10,
        userId: user.id,
        search,
      });

      if (response.data && response.meta) {
        setPrompts(Array.isArray(response.data) ? response.data : []);
        setTotalPages(response.meta.totalPages || 1);
      }

      console.log("Fetched prompts:", response.data);
    } catch (error) {
      console.error("Failed to fetch prompts:", error);
      // Optionally set some error state here
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, [currentPage, search, user?.id]); // Add token and user.id as dependencies

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const columns = React.useMemo<ColumnDef<PromptResponse>[]>(
    () => [
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "content",
        header: "Content",
      },
      {
        accessorKey: "createdAt",
        header: "Date Created",
        cell: ({ getValue }) => {
          const value = getValue() as string;
          const localDate = new Date(value).toLocaleString();
          return <span>{localDate}</span>;
        },
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const prompt = row.original;
          return (
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(prompt)}
                className="py-2 px-2 inline-flex items-center gap-x-2 text-xs font-medium rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              >
                <RiEditCircleLine />
                Edit
              </button>

              <button
                onClick={() => handleDelete(prompt)}
                className="py-2 px-2 inline-flex items-center gap-x-2 text-xs font-medium rounded-xl border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
              >
                <RiEditCircleLine />
                Delete
              </button>
            </div>
          );
        },
      },
    ],
    []
  );

  const handleAdd = () => {
    setOpenAdd(true);
  };

  const handleEdit = (row: PromptResponse) => {
    setSelectedPrompt(row);
    setOpenEdit(true);
  };

  const handleDelete = (row: PromptResponse) => {
    setSelectedPrompt(row);
    setOpenDelete(true);
  };
  return (
    <MainLayout>
      <div>
        <DataTableHeader
          title="Prompts"
          buttons={[
            {
              label: "Create Prompt",
              onClick: handleAdd,
              icon: <IoMdAdd />,
              className: "bg-[#129D93] hover:bg-[#129D93]/80 text-white",
            },
          ]}
        />
        <DataTableBody
          columns={columns}
          data={prompts}
          isLoading={isLoading}
          totalPages={totalPages || 1}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />

        <CreatePrompt
          open={openAdd}
          onClose={() => setOpenAdd(false)}
          userId={user?.id || ""}
          fetchPrompts={fetchPrompts}
        />

        <EditPrompt
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          selectedPrompt={selectedPrompt}
          fetchPrompts={fetchPrompts}
        />

        <DeletePrompt
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          selectedPrompt={selectedPrompt}
          fetchPrompts={fetchPrompts}
        />
      </div>
    </MainLayout>
  );
};

export default Prompt;
