type ProductInfoProps = {
  title: string;
  description: string;
};

export default function ProductInfo({ title, description }: ProductInfoProps) {
  return (
    <div className="mb-2 text-xs text-gray-500 flex flex-col gap-2">
      <h6 className="text-sm font-bold mb-4">{title}</h6>
      <strong className="text-gray-700 text-xs">معرفی:</strong>
      <p className="text-justify">{description}</p>
    </div>
  );
}
