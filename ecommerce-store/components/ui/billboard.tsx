import { Billboard } from "@/types";

interface BillboardProps {
  data: Billboard;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  console;
  return (
    <div className="py-4 sm:py-6 lg:py-8 rounded-xl overflow-hidden mb-10">
      <div
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
        className="rounded-t-xl relative aspect-square md:aspect-[1.4/0.5] overflow-hidden bg-cover"
      >
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs opacity-0">
            {data?.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
