import { Select, SelectItem } from "@heroui/react";

export const AgentsTabAgentsFilter = () => {
  return (
    <Select
      placeholder="Select Location"
      variant="flat"
      className="rounded-lg bg-gray-50 w-[150px] mb-5"
    >
      <SelectItem key="davao">Davao City</SelectItem>
      <SelectItem key="cdo">Cagayan de Oro</SelectItem>
      <SelectItem key="zamboanga">Zamboanga City</SelectItem>
      <SelectItem key="gensan">General Santos</SelectItem>
      <SelectItem key="butuan">Butuan City</SelectItem>
      <SelectItem key="iligan">Iligan City</SelectItem>
    </Select>
  );
};
