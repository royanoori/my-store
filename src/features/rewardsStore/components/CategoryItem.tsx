"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface CategoryItemProps {
 id: number;
 name: string;
 image: string;
}

function CategoryItem({ id, name, image }: CategoryItemProps) {
 const pathname = usePathname();
 return (
  <Link href={`${pathname}/${id}`} key={id}>
   <div className="flex flex-col items-center justify-center">
    <Image src={image} alt={name} width={60} height={60} priority />
    <span className="text-[10px] text-gray-700 mt-2 font-semibold">{name}</span>
   </div>
  </Link>
 );
}

export default CategoryItem;
