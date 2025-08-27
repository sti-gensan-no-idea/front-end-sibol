import { getTimeOfDay } from "@/utils/utils";

export const AdminWelcome = () => {
  return (
    <div className="rounded-large p-8 bg-white shadow-medium">
      <h2 className="text-3xl font-bold text-foreground-700">
        Good {getTimeOfDay()}, Anna!
      </h2>
      <span className="mt-2 flex text-foreground-700">
        Heres your users performance overview
      </span>

      <ul className="grid grid-cols-4 gap-4 mt-8">
        <li className="bg-gray-100 rounded-medium flex flex-col p-4">
          <span className="flex font-bold text-2xl">12</span>
          <span className="flex">Developers Pending Approval</span>
        </li>
        <li className="bg-gray-100 rounded-medium flex flex-col p-4">
          <span className="flex font-bold text-2xl">7</span>
          <span className="flex">Brokers Pending Approval</span>
        </li>
        <li className="bg-gray-100 rounded-medium flex flex-col p-4">
          <span className="flex font-bold text-2xl">35</span>
          <span className="flex">Properties Pending Approval</span>
        </li>
        <li className="bg-gray-100 rounded-medium flex flex-col p-4">
          <span className="flex font-bold text-2xl">5</span>
          <span className="flex">Escalated Maintenance Requests</span>
        </li>
      </ul>
    </div>
  );
};
