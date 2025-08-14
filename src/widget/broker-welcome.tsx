import { getTimeOfDay } from "@/utils/utils";

export const BrokerWelcome = () => {
  return (
    <div className="rounded-large p-8 bg-white shadow-medium">
      <h2 className="text-3xl font-bold text-foreground-700">
        Good {getTimeOfDay()}, Anna!
      </h2>
      <span className="mt-2 flex text-foreground-700">
        Heres your team performance overview
      </span>

      <ul className="grid grid-cols-4 gap-4 mt-8">
        <li className="bg-gray-100 rounded-medium flex flex-col p-4">
          <span className="flex font-bold text-2xl">18</span>
          <span className="flex">Properties assigned</span>
        </li>
        <li className="bg-gray-100 rounded-medium flex flex-col p-4">
          <span className="flex font-bold text-2xl">6</span>
          <span className="flex">Active agents</span>
        </li>
        <li className="bg-gray-100 rounded-medium flex flex-col p-4">
          <span className="flex font-bold text-2xl">₱5.3M</span>
          <span className="flex">Total Sales (This month)</span>
        </li>
        <li className="bg-gray-100 rounded-medium flex flex-col p-4">
          <span className="flex font-bold text-2xl">John Santos</span>
          <span className="flex">Top Performer (8 Deals)</span>
        </li>
      </ul>
    </div>
  );
};
