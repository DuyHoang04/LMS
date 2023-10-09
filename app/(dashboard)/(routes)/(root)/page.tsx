import { Clock } from "lucide-react";
import { InfoCard } from "./_component/info-card";

export default function Home() {
  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={coursesInProgress.length}
        /> */}
      </div>

    </div>
  )
}