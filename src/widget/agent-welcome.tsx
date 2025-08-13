import { getTimeOfDay } from "@/utils/utils";

export const AgentWelcome = () => {
  return (
    <div className="rounded-large p-8 bg-white shadow-medium">
      <h2 className="text-3xl font-bold text-foreground-700">
        Good {getTimeOfDay()}, Mark!
      </h2>
      <span className="mt-2 flex text-foreground-700">
        Heres your team performance overview
      </span>

      <ul className="grid grid-cols-4 gap-4 mt-8">
        <li className="bg-gray-100 rounded-medium flex flex-col p-4">
          <span className="flex font-bold text-2xl">12</span>
          <span className="flex">Active Properties</span>
        </li>
        <li className="bg-gray-100 rounded-medium flex flex-col p-4">
          <span className="flex font-bold text-2xl">35</span>
          <span className="flex">Active Leads</span>
        </li>
        <li className="bg-gray-100 rounded-medium flex flex-col p-4">
          <span className="flex font-bold text-2xl">₱150K</span>
          <span className="flex">Revenue Generated</span>
        </li>
        <li className="bg-gray-100 rounded-medium flex flex-col p-4">
          <span className="flex font-bold text-2xl">75%</span>
          <span className="flex">Automation Rate</span>
        </li>
      </ul>
    </div>
  );
};
