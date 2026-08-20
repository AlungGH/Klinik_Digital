"use client";

import { Trash2 } from "lucide-react";
import React from "react";

interface DeleteButtonProps {
  id: string;
  confirmMessage: string;
}

export default function DeleteButton({ id, confirmMessage }: DeleteButtonProps) {
  return (
    <button
      type="submit"
      className="btn-danger"
      style={{ width: "100%" }}
      id={id}
      onClick={(e) => {
        if (!window.confirm(confirmMessage)) {
          e.preventDefault();
        }
      }}
    >
      <Trash2 size={15} />
      Hapus
    </button>
  );
}
