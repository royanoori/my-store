import HistoryItem from "./HistoryItem";
import { ScoreItem } from "../../type";

interface HistoryListProps {
  scores: ScoreItem[];
}

export default function HistoryList({ scores }: HistoryListProps) {
  return (
    <main className="overflow-auto px-3">
      {scores.map((item, index) => (
        <HistoryItem key={index} item={item} />
      ))}
    </main>
  );
}
