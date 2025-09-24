import helpData from "../../store/help.json";
import HelpAccordion from "./HelpAccordion";

export default function HelpList() {
  return (
    <main className="overflow-auto px-3">
      {helpData.map((item, index) => (
        <HelpAccordion
          key={index}
          id={`panel${index}`}
          title={item.sectionTitle}
          content={item.content}
        />
      ))}
    </main>
  );
}
