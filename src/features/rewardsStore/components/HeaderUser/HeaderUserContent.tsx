import { Avatar, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { LuCircleHelp, LuHistory } from "react-icons/lu";

interface HeaderUserContentProps {
 agencyCode: string;
 name: string;
 family: string;
 score: number;
}

export default function HeaderUserContent({
 agencyCode,
 name,
 family,
 score,
}: HeaderUserContentProps) {
 return (
  <header className="w-full h-[23vh] bg-linear-to-r from-primary to-tertiary p-4 rounded-bl-full shadow-xl">
   <div className="grid grid-cols-6 w-full h-full gap-2">
    <div className="col-span-1 flex justify-start">
     <Link href={`/rewardsStore/${agencyCode}/history`} key="history">
      <LuHistory size={22} color="#ffff" />
     </Link>
    </div>
    <div className="col-span-4 flex flex-col items-center justify-center h-full gap-2">
     <Link href={`/rewardsStore/${agencyCode}`} key="avatar">
      <Avatar
       alt={name}
       src="/images/avatar.jpg"
       sx={{ width: 60, height: 60 }}
      />
     </Link>
     <Typography variant="subtitle1" fontWeight={400} className="text-white">
      {name} {family}
     </Typography>
     <div className="flex items-center gap-1 text-yellow-600 text-sm">
      <Image alt="score" src="/images/gold.png" width={22} height={22} />
      <span className="font-semibold">{score} امتیاز</span>
     </div>
    </div>
    <div className="col-span-1 flex justify-end">
     <Link href={`/rewardsStore/${agencyCode}/help`} key="help">
      <LuCircleHelp size={22} color="#ffff" />
     </Link>
    </div>
   </div>
  </header>
 );
}
