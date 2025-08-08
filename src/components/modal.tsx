"use client";

import { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IoCloseCircle } from "react-icons/io5";

type ButtonProps = {
  label: string;
  onClick: any;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
};

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  buttons?: ButtonProps[];
};

export const Modal = ({
  open,
  onClose,
  title,
  children,
  buttons = [],
}: ModalProps) => {
  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" onClose={onClose} className="relative z-50">
          {/* Background Overlay */}
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/20" />
          </TransitionChild>

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:scale-95"
            >
              <DialogPanel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left shadow-xl transition-all">
                {/* Close Button */}
                <div className="absolute top-4 right-5">
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-400 cursor-pointer hover:text-gray-500 focus:outline-none"
                  >
                    <span className="sr-only">Close</span>
                    <IoCloseCircle className="h-6 w-6 " />
                  </button>
                </div>

                {/* Modal Title */}
                {title && (
                  <DialogTitle
                    as="h3"
                    className="text-md font-semibold text-gray-900 "
                  >
                    {title}
                  </DialogTitle>
                )}
                <hr className="border-hr border-neutral-300 mt-2" />
                {/* Content */}
                <div className="mt-4">{children}</div>

                {/* Buttons */}
                {buttons.length > 0 && (
                  <div className="mt-6 flex justify-end space-x-3">
                    {buttons.map((button, index) => (
                      <button
                        key={index}
                        type={button.type || "button"}
                        onClick={button.onClick}
                        disabled={button.disabled}
                        className={`inline-flex justify-center cursor-pointer rounded-lg px-4 py-2 text-sm font-medium shadow-sm ${button.className}`}
                      >
                        {button.label} {button.icon}
                      </button>
                    ))}
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
