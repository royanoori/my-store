"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { setAgencyCode, setName, setScore } from "../../redux/userSlice";
import { useGetServicerCurrentScore } from "../../hooks/useGetServicerCurrentScore";
import { useGetServicerData } from "@/shared/core/user/hooks";
import { notFound } from "next/navigation";
import { useSnackbar } from "@/providers/SnackbarProvider";
import Loading from "@/app/loading";
import HeaderUserContent from "./HeaderUserContent";

interface HeaderUserProps {
  agencyCode: string;
}

export default function HeaderUser({ agencyCode }: HeaderUserProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { showMessage } = useSnackbar();

  const {
    data: userData,
    isLoading: isLoadingUser,
    isSuccess,
  } = useGetServicerData(agencyCode);

  const { data: userScore, isLoading: isLoadingScore } =
    useGetServicerCurrentScore(agencyCode, {
      enabled: !!userData && userData.IsSuccess === true,
    });

  // اگر API اول موفق نبود → notFound
  useEffect(() => {
    if (!isLoadingUser && userData?.IsSuccess === false) {
      showMessage("کاربر پیدا نشد!", "error");
      notFound();
    }
  }, [isLoadingUser, userData, showMessage]);

  // dispatch دیتا
  useEffect(() => {
    if (isSuccess && userData?.IsSuccess) {
      dispatch(setAgencyCode(agencyCode));
      dispatch(
        setName({
          firstName: userData.Data.Name,
          lastName: userData.Data.Family,
        })
      );
    }
  }, [isSuccess, userData, dispatch, agencyCode]);

  // dispatch امتیاز
  useEffect(() => {
    if (userScore?.Data) {
      dispatch(setScore(userScore.Data.Score));
    }
  }, [userScore, dispatch]);

  if (isLoadingUser || (userData?.IsSuccess && isLoadingScore)) {
    return <Loading />;
  }

  return (
    <HeaderUserContent
      agencyCode={agencyCode}
      name={userData?.Data.Name || ""}
      family={userData?.Data.Family || ""}
      score={userScore?.Data.Score || 0}
    />
  );
}
