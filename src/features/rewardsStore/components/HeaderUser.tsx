"use client";
import Loading from "@/app/loading";
import NotFound from "@/app/not-found";
import { AppDispatch } from "@/store/store";
import { Avatar, Typography } from "@mui/material";
import { use, useEffect, useState } from "react";
import { FaAward } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useServicerScore } from "../hooks/useServicerScore";
import { setAgencyCode, setName, setScore } from "../redux/userSlice";
import { useGetServicerData } from "@/shared/core/user/hooks";

function HeaderUser({ agencyCode }: { agencyCode: string }) {
 const dispatch = useDispatch<AppDispatch>();
 const [isInvalid, setIsInvalid] = useState(false);
 const { data: userScore, isLoading, error } = useServicerScore(agencyCode);
 const { data: userDataName, isLoading: isLoadingUserDataName } =
  useGetServicerData(agencyCode);

 useEffect(() => {
  if (userScore?.Data !== undefined) {
   dispatch(setScore(userScore.Data.Score));
  }
 }, [userScore, dispatch]);
 useEffect(() => {
  if (userDataName?.Data !== undefined) {
   dispatch(
    setName({
     firstName: userDataName.Data.Name,
     lastName: userDataName.Data.Family,
    })
   );
  }
 }, [userDataName, dispatch]);

 useEffect(() => {
  const numericCode = Number(agencyCode);
  if (!isNaN(numericCode) && numericCode > 0) {
   dispatch(setAgencyCode(agencyCode));
   setIsInvalid(false);
  } else {
   setIsInvalid(true);
  }
 }, [agencyCode, dispatch]);

 if (isInvalid || error) return <NotFound />;
 if (isLoading || isLoadingUserDataName) return <Loading />;

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
      {userDataName?.Data.Name} {userDataName?.Data.Family}
     </Typography>
     <div className="flex items-center gap-1 text-yellow-600 text-sm">
      <FaAward size={20} />
      <span className="font-semibold">{userScore?.Data.Score} امتیاز</span>
     </div>
    </div>
    <div className="col-span-1">{/* <ThemeToggle /> */}</div>
   </div>
  </header>
 );
}

export default HeaderUser;
