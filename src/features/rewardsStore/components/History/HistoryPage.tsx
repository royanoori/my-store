"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useGetScoreList } from "../../hooks/useGetScoreList";
import HistoryList from "./HistoryList";
import LoadMoreButton from "./LoadMoreButton";
import { ScoreItem } from "../../type";

export default function HistoryPage() {
  const agencyCode = useSelector((state: RootState) => state.user.agencyCode);
  const [page, setPage] = useState(1);
const [allScores, setAllScores] = useState<ScoreItem[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isLoading, isFetching } = useGetScoreList(page, agencyCode, {
    enabled: !!agencyCode,
  });

  useEffect(() => {
    if (data?.ScoreList) {
      setAllScores((prev) => [...prev, ...data.ScoreList]);
      if (data.ScoreList.length === 0) setHasMore(false);
    }
  }, [data]);

  const loadMore = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  return (
    <>
      <HistoryList scores={allScores} />
      {(hasMore || isLoading || isFetching) && (
        <LoadMoreButton onClick={loadMore} isLoading={isFetching || isLoading} />
      )}
    </>
  );
}
