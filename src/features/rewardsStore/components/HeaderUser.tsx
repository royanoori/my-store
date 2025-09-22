"use client";
import Loading from "@/app/loading";
import { AppDispatch } from "@/store/store";
import { Avatar, Typography } from "@mui/material";
import { useEffect } from "react";
import { FaAward } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useGetServicerCurrentScore } from "../hooks/useGetServicerCurrentScore";
import { setAgencyCode, setName, setScore } from "../redux/userSlice";
import { useGetServicerData } from "@/shared/core/user/hooks";
import { notFound } from "next/navigation";
import { useSnackbar } from "@/providers/SnackbarProvider";
import Image from "next/image";
import HistoryPage from "./HistoryPage";
import { LuCircleHelp, LuHistory } from "react-icons/lu";
import Link from "next/link";
import { IoMdHelpCircle } from "react-icons/io";

function HeaderUser({ agencyCode }: { agencyCode: string }) {
 const dispatch = useDispatch<AppDispatch>();
 const { showMessage } = useSnackbar();
 // API اول
 const {
  data: userDataName,
  isLoading: isLoadingUserDataName,
  isSuccess,
 } = useGetServicerData(agencyCode);

 // API دوم → فقط وقتی فعال میشه که API اول موفق باشه
 const { data: userScore, isLoading: isLoadingScore } =
  useGetServicerCurrentScore(agencyCode, {
   enabled: !!userDataName && userDataName.IsSuccess === true,
  });

 // اگر API اول لود شد ولی دیتا گفت success = false → برو نات‌فاند
 useEffect(() => {
  if (!isLoadingUserDataName && userDataName?.IsSuccess === false) {
   showMessage("کاربر پیدا نشد!", "error"); // ✅ حالا داخل useEffect
   notFound();
  }
 }, [isLoadingUserDataName, userDataName, showMessage]);
 // dispatch وقتی دیتا درست باشه
 useEffect(() => {
  if (isSuccess && userDataName?.IsSuccess) {
   dispatch(setAgencyCode(agencyCode));
   dispatch(
    setName({
     firstName: userDataName.Data.Name,
     lastName: userDataName.Data.Family,
    })
   );
  }
 }, [isSuccess, userDataName, dispatch, agencyCode]);

 // آپدیت ریداکس با امتیاز
 useEffect(() => {
  if (userScore?.Data) {
   dispatch(setScore(userScore.Data.Score));
  }
 }, [userScore, dispatch]);

 // لودینگ
 if (isLoadingUserDataName || (userDataName?.IsSuccess && isLoadingScore)) {
  return <Loading />;
 }

 return (
  <header className="w-full h-[23vh] bg-linear-to-r from-primary to-tertiary p-4 rounded-bl-full shadow-xl">
   <div className="grid grid-cols-6 w-full h-full gap-2">
    <div className="col-span-1">
      <Link href={'/rewardsStore/'+agencyCode+'/history'}
      key='history'>
      <LuHistory size={22} color="#ffff" />
      </Link>
    </div>
    <div className="col-span-4 flex flex-col items-center justify-center h-full gap-2">
       <Link href={'/rewardsStore/'+agencyCode}
      key='help'>
     <Avatar
      alt="Remy Sharp"
      src="/images/avatar.jpg"
      sx={{ width: 60, height: 60 }}
     />
     </Link>
     <Typography variant="subtitle1" fontWeight={400} className="text-white">
      {userDataName?.Data.Name} {userDataName?.Data.Family}
     </Typography>
     <div className="flex items-center gap-1 text-yellow-600 text-sm">
      <Image alt="score" src="/images/gold.png" width={22} height={22} />
      <span className="font-semibold">{userScore?.Data.Score} امتیاز</span>
     </div>
    </div>
    <div className="col-span-1 flex justify-end">
      <Link href={'/rewardsStore/'+agencyCode+'/help'}
      key='help'>
      <LuCircleHelp size={22} color="#ffff" />
      </Link>
    </div>
   </div>
  </header>
 );
}

export default HeaderUser;
