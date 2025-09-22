"use client";

import React, { useState, useEffect } from "react";
import { useGetScoreList } from "../hooks/useGetScoreList";
import { ScoreItem } from "../type";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Button } from "@mui/material";
import Image from "next/image";

import dayjs from "dayjs";
import jalaliday from "jalaliday";
dayjs.extend(jalaliday);

export default function HistoryPage() {
 const agencyCode = useSelector((state: RootState) => state.user.agencyCode);
 const pathname = usePathname();

 // حذف آخرین بخش از آدرس
 const backUrl = pathname.split("/").slice(0, -1).join("/") || "/";

 const [page, setPage] = useState(1);
 const [allScores, setAllScores] = useState<ScoreItem[]>([]);
 const [hasMore, setHasMore] = useState(true);

 const { data, isLoading, isFetching } = useGetScoreList(page, agencyCode, {
  enabled: !!agencyCode,
 });

 // اضافه کردن آیتم‌های جدید به آرایه
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
   <header className="w-full flex justify-start items-center text-lg pb-3 px-3 font-semibold">
    <Link href={backUrl} className="ml-2 text-2xl">
     <IoIosArrowRoundForward size={25} className="text-secondary font-bold" />
    </Link>
    <span>تاریخچه امتیازات</span>
   </header>

   <main className="overflow-auto px-3">
    {allScores.map((item, index) => {
     // تبدیل تاریخ به شمسی + روز هفته + ساعت
     const persianDate = dayjs(item.TransactionDate)
      .calendar("jalali")
      .locale("fa")
      .format("dddd DD MMMM YYYY - HH:mm");

     return (
      <div className="shadow-sm rounded-md bg-gray-50 mb-2 px-3" key={index}>
       <header className="py-3 border-b border-gray-100 font-bold text-gray-500 text-xs flex justify-between">
        <span>{persianDate}</span>
        <div className="flex items-center gap-1 text-xs text-primary font-bold">
         <Image alt="score" src="/images/gold.png" width={15} height={15} />
         {item.Count} امتیاز
        </div>
       </header>

       <main>
        <span className="text-gray-700 leading-relaxed text-sm py-2 block">
         {item.Description}
        </span>
       </main>

       <footer className="py-3 border-t border-gray-100 font-bold text-secondary text-sm flex items-center justify-between">
        {item.ScoreSource}
        {item.ScoreType === 1 ? (
         <span className="text-green-800 text-xs p-2 rounded-sm bg-green-100">
          دریافت
         </span>
        ) : (
         <span className="text-red-800 text-xs p-2 rounded-sm bg-red-100">
          خرید
         </span>
        )}
       </footer>
      </div>
     );
    })}
   </main>

   {(hasMore || isLoading || isFetching) && (
    <footer className="p-3 flex justify-center">
     {hasMore && !isFetching && (
      <Button color="primary" variant="outlined" onClick={loadMore}>
       بارگذاری بیشتر
      </Button>
     )}

     {(isLoading || isFetching) && (
      <p className="mt-2 text-gray-400 text-sm">در حال بارگذاری...</p>
     )}
    </footer>
   )}
  </>
 );
}
