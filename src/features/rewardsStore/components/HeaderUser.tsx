import ThemeToggle from "@/components/ThemeToggle";
import { Avatar, Typography } from "@mui/material";
import React from "react";
import { FaAward } from "react-icons/fa";

function HeaderUser({ userName }: { userName: string }) {
 return (
  <header className="w-full h-[23vh] bg-linear-to-r from-primary to-tertiary p-4 rounded-bl-full shadow-xl">
   <div className="grid grid-cols-6 w-full h-full gap-2">
    <div className="col-span-1"></div>
    <div className="col-span-4 flex flex-col items-center justify-center h-full gap-2">
     <Avatar
      alt="Remy Sharp"
      src="/images/avatar.jpg"
      sx={{ width: 60, height: 60 }}
     />
     <Typography variant="subtitle1" fontWeight={400} className="text-white">
     {userName}
     </Typography>
     <div className="flex items-center gap-1 text-yellow-600 text-sm">
      <FaAward size={20} />
      <span className="font-semibold">1200 امتیاز</span>
     </div>
    </div>
    <div className="col-span-1">
     <ThemeToggle />
    </div>
   </div>
  </header>
 );
}

export default HeaderUser;
