"use client";

import { Button } from "@mui/material";

interface LoadMoreButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export default function LoadMoreButton({ onClick, isLoading }: LoadMoreButtonProps) {
  return (
    <div className="p-3 flex justify-center">
      <Button color="primary" variant="outlined" onClick={onClick} disabled={isLoading}>
        {isLoading ? "در حال بارگذاری..." : "بارگذاری بیشتر"}
      </Button>
    </div>
  );
}
