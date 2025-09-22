"use client";

import React, { useState } from "react";
import {
 Accordion,
 AccordionSummary,
 AccordionDetails,
 Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import helpData from "../store/help.json";
import Link from "next/link";
import { IoIosArrowRoundForward, IoMdArrowRoundForward } from "react-icons/io";
import { usePathname } from "next/navigation";
import { IoArrowForwardOutline } from "react-icons/io5";

function HelpPage() {
 const [expanded, setExpanded] = useState<string | false>(false);

 const handleChange =
  (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
   setExpanded(isExpanded ? panel : false);
  };
 const pathname = usePathname();

 // حذف آخرین بخش از آدرس
 const backUrl = pathname.split("/").slice(0, -1).join("/") || "/";
 return (
  <>
   <header className="w-full flex justify-start items-center text-lg pb-3 px-3 font-semibold">
    <Link href={backUrl} className="ml-2 text-2xl">
     <IoIosArrowRoundForward size={25} className="text-secondary font-bold" />
    </Link>
    <span>سوالات متداول</span>
   </header>
   <main className="overflow-auto px-3">
    {helpData.map((item, index) => (
     <Accordion
      key={index}
      expanded={expanded === `panel${index}`}
      onChange={handleChange(`panel${index}`)}
      className="!rounded-md overflow-hidden mb-2 shadow-sm"
     >
      <AccordionSummary
       expandIcon={<ExpandMoreIcon />}
       aria-controls={`panel${index}d-content`}
       id={`panel${index}d-header`}
       className="!bg-gray-100"
      >
       <span className="text-sm text-gray-800">{item.sectionTitle}</span>
      </AccordionSummary>
      <AccordionDetails className="bg-white">
       <span className="text-gray-600 leading-relaxed text-sm">
        {item.content}
       </span>
      </AccordionDetails>
     </Accordion>
    ))}
   </main>
  </>
 );
}

export default HelpPage;
