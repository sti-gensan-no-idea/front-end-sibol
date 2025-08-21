import { getTimeOfDay } from "@/utils/utils";

export const DeveloperWelcome = () => {
  return (
    <div className="rounded-large p-8 bg-white shadow-medium">
      <h2 className="text-3xl font-bold text-foreground-700">
        Good {getTimeOfDay()}, Mark!
      </h2>
      <span className="mt-2 flex text-foreground-700">
        Here&apos;s your properties overview
      </span>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <li className="bg-gray-100 rounded-medium flex flex-col p-4">
          <span className="flex font-bold text-2xl">12</span>
          <span className="flex">Total Properties</span>
        </li>
        <li className="bg-gray-100 rounded-medium flex flex-col p-4">
          <span className="flex font-bold text-2xl">16</span>
          <span className="flex">Total Sales</span>
        </li>
        <li className="bg-gray-100 rounded-medium flex flex-col p-4">
          <span className="flex font-bold text-2xl">24</span>
          <span className="flex">Active Leads</span>
        </li>
        <li className="bg-gray-100 rounded-medium flex flex-col p-4">
          <span className="flex font-bold text-2xl">₱5.6M</span>
          <span className="flex">Revenue</span>
        </li>
      </ul>
    </div>
  );
};
