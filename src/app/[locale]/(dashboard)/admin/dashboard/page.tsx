import CardDataStats from "@/components/admin/CardDataStats";
import { Users } from "lucide-react";
import { FC } from "react";

const Dashbooard: FC = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total views" total="$3.456K" rate="0.43%" levelUp>
          <Users className="fill-primary text-muted" />
        </CardDataStats>
      </div>
    </>
  );
};

export default Dashbooard;
