import { Button, Input, Pagination, Select, SelectItem } from "@heroui/react";

export const PropSearchContent = () => {
  const sortOptions = [
    { key: "name", label: "Name" },
    { key: "price", label: "Price" },
    { key: "date", label: "Date" },
  ];
  const filterOptions = [
    { key: "name", label: "Name" },
    { key: "price", label: "Price" },
    { key: "date", label: "Date" },
  ];

  return (
    <div>
      {/* Search Property */}
      <div className="flex items-center">
        <Input
          className="max-w-4xl"
          color="primary"
          placeholder="Search by location, property type..."
          size="lg"
          type="text"
          variant="bordered"
        />
        <Button className="ml-3 mr-auto" color="primary" size="lg">
          Search
        </Button>
        <Select className="max-w-36 ml-3" label="Sort by" size="sm">
          {sortOptions.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>
        <Select className="ml-3 max-w-36" label="Filter" size="sm">
          {filterOptions.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>
      </div>

      {/* Content List */}
      <div className="flex flex-col gap-6 mt-16">
        <div className="p-8 w-full h-60 rounded-large bg-gray-300" />
        <div className="p-8 w-full h-60 rounded-large bg-gray-300" />
        <div className="p-8 w-full h-60 rounded-large bg-gray-300" />
        <div className="p-8 w-full h-60 rounded-large bg-gray-300" />
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-16 mb-24">
        <Pagination isCompact showControls initialPage={1} total={10} />
      </div>
    </div>
  );
};
