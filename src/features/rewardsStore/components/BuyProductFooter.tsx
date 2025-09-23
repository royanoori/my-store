"use client";
import { useState } from "react";
import {
 Button,
 Dialog,
 DialogActions,
 DialogContent,
 DialogTitle,
} from "@mui/material";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type BuyProductFooterProps = {
 price: number | string;
};

function BuyProductFooter({ price }: BuyProductFooterProps) {
 const [open, setOpen] = useState(false);
 const userScore = useSelector((state: RootState) => state.user.score) ?? 0;
 // باز و بسته کردن مودال
 const handleOpen = () => setOpen(true);
 const handleClose = () => setOpen(false);

 // تابع تایید خرید
 const handleConfirm = () => {
  console.log("✅ خرید انجام شد"); // اینجا می‌تونی API بزنی یا dispatch کنی
  setOpen(false);
 };

 return (
  <>
   <footer className="p-2 border-t border-gray-100 flex justify-between items-center">
    <Button
     startIcon={<FaCartShopping size={12} className="ml-2" />}
     variant="contained"
     className="w-3/12"
     color="secondary"
     size="medium"
     onClick={handleOpen}
     disabled={userScore < Number(price)} // اگر امتیاز کاربر کمتر بود غیرفعال
    >
     خرید
    </Button>
    <div className="flex gap-1 items-center justify-center">
     <span className="text-xl text-secondary font-bold">{price}</span>
     <span className="text-[8px] text-gray-400">امتیاز</span>
    </div>
   </footer>

   {/* مودال تایید خرید */}
   <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
    <DialogTitle className="text-center font-bold text-lg">
     تایید خرید
    </DialogTitle>
    <DialogContent className="text-center text-sm">
     آیا از خرید این محصول اطمینان دارید؟
    </DialogContent>
    <DialogActions className="flex justify-center gap-3 pb-3">
     <Button variant="outlined" color="primary" onClick={handleClose}>
      انصراف
     </Button>
     <Button variant="contained" color="secondary" onClick={handleConfirm}>
      تایید
     </Button>
    </DialogActions>
   </Dialog>
  </>
 );
}

export default BuyProductFooter;
