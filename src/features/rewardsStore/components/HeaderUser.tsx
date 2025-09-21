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

function HeaderUser({ agencyCode }: { agencyCode: string }) {
  const dispatch = useDispatch<AppDispatch>();

  // API اول
  const {data: userDataName,isLoading: isLoadingUserDataName,isSuccess} = useGetServicerData(agencyCode);

  // API دوم → فقط وقتی فعال میشه که API اول موفق باشه
  const {data: userScore,isLoading: isLoadingScore} = useGetServicerCurrentScore(agencyCode, {
    enabled: !!userDataName && userDataName.IsSuccess === true  
  });

  // اگر API اول لود شد ولی دیتا گفت success = false → برو نات‌فاند
  if (!isLoadingUserDataName && userDataName?.IsSuccess === false) {
    notFound();
  }

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
        <div className="col-span-1"></div>
        <div className="col-span-4 flex flex-col items-center justify-center h-full gap-2">
          <Avatar
            alt="Remy Sharp"
            src="/images/avatar.jpg"
            sx={{ width: 60, height: 60 }}
          />
          <Typography
            variant="subtitle1"
            fontWeight={400}
            className="text-white"
          >
            {userDataName?.Data.Name} {userDataName?.Data.Family}
          </Typography>
          <div className="flex items-center gap-1 text-yellow-600 text-sm">
            <FaAward size={20} />
            <span className="font-semibold">{userScore?.Data.Score} امتیاز</span>
          </div>
        </div>
        <div className="col-span-1"></div>
      </div>
    </header>
  );
}

export default HeaderUser;
