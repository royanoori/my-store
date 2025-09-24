import Image from "next/image";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import { ScoreItem } from "../../type";
dayjs.extend(jalaliday);

interface HistoryItemProps {
  item: ScoreItem;
}

export default function HistoryItem({ item }: HistoryItemProps) {
  const persianDate = dayjs(item.TransactionDate)
    .calendar("jalali")
    .locale("fa")
    .format("dddd DD MMMM YYYY");

  return (
    <div className="shadow-sm rounded-md bg-gray-50 mb-2 px-3">
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
}
