import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardBody, CardFooter, Divider } from "@heroui/react";
import { IconView360Number } from "@tabler/icons-react";

import { properties_data } from "@/data/properties_data";

export const ClientDashboardContent = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  // Set up pagination state from URL
  const pageParam = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(pageParam);
  const itemsPerPage = 6;

  const paginatedProperties = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;

    return properties_data.slice(start, start + itemsPerPage);
  }, [currentPage, properties_data]);

  return (
    <div className="container mx-auto pt-7 pr-8 pb-8 pl-20">
      <div className="gap-4 grid grid-cols-3">
        {paginatedProperties.map((property, index) => (
          <Card
            key={index}
            isPressable
            className="shadow-medium shadow-gray-300 "
            shadow="sm"
            onPress={() => navigate(`/properties/preview?id=${property.id}`)}
          >
            <CardBody className="overflow-visible p-0 relative">
              <img
                alt={property.title}
                className="w-full object-cover h-[232px]"
                src={property.img}
                width="100%"
              />
              <div className="absolute bg-black/50 right-4 bottom-4 p-2 rounded-full">
                <IconView360Number color="white" size={26} />
              </div>
            </CardBody>
            <CardFooter className="p-6">
              <div className="flex flex-col w-full">
                <div className="flex items-center">
                  <span className="flex text-2xl text-primary">
                    {property.price}
                  </span>
                  <span className="text-foreground-500 ml-2">/ month</span>
                </div>
                <span className="flex text-3xl mt-3 text-foreground-700 font-bold">
                  {property.title}
                </span>
                <span className="text-foreground-500 mt-3 flex">
                  {property.address}
                </span>
                <Divider className="my-4 w-full" />
                <span className="flex items-center justify-center text-foreground-500">
                  {property.bed} beds • {property.bathroom} bathrooms •{" "}
                  {property.size[0]}x{property.size[1]} meters
                </span>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
