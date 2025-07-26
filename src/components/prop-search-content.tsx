import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Button, Input, Pagination, Select, SelectItem } from "@heroui/react";

export const PropSearchContent = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialPage = Number(searchParams.get("page")) || 1;
  const initialSort = searchParams.get("sort") || "";
  const initialFilter = searchParams.get("filter") || "";
  const initialSearch = searchParams.get("q") || "";

  const [page, setPage] = useState(initialPage);
  const [sort, setSort] = useState(initialSort);
  const [filter, setFilter] = useState(initialFilter);
  const [search, setSearch] = useState(initialSearch);

  const sortOptions = [
    { key: "name", label: "Name" },
    { key: "price", label: "Price" },
    { key: "date", label: "Date" },
  ];

  const filterOptions = sortOptions;

  // Update URL query params when any state changes
  useEffect(() => {
    const params = new URLSearchParams();

    if (search) params.set("q", search);
    if (sort) params.set("sort", sort);
    if (filter) params.set("filter", filter);
    if (page > 1) params.set("page", page.toString());

    setSearchParams(params);
  }, [page, sort, filter, search, setSearchParams]);

  const onSearchClick = () => setPage(1);

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
          value={search}
          variant="bordered"
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          className="ml-3 mr-auto"
          color="primary"
          size="lg"
          onClick={onSearchClick}
        >
          Search
        </Button>

        <Select
          className="max-w-36 ml-3"
          label="Sort by"
          selectedKeys={[sort]}
          size="sm"
          onSelectionChange={(key) => {
            setSort(Array.from(key)[0] as string);
            setPage(1);
          }}
        >
          {sortOptions.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>

        <Select
          className="ml-3 max-w-36"
          label="Filter"
          selectedKeys={[filter]}
          size="sm"
          onSelectionChange={(key) => {
            setFilter(Array.from(key)[0] as string);
            setPage(1);
          }}
        >
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
        <Pagination
          showControls
          boundaries={1}
          color="primary"
          page={page}
          total={10}
          onChange={setPage}
        />
      </div>
    </div>
  );
};
