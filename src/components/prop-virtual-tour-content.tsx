import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Pagination,
  Select,
  SelectItem,
} from "@heroui/react";
import { IconView360Number } from "@tabler/icons-react";

export const PropTourContent = () => {
  const navigate = useNavigate();

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

  const properties = [
    {
      id: "89aa9d46-1be0-4859-883f-303bc0a17cd7",
      title: "Property name here",
      img: "https://images.pexels.com/photos/323776/pexels-photo-323776.jpeg",
      price: "₱5,300",
      address: "Provido Village City Heights, General Santos City.",
      bed: 3,
      bathroom: 2,
      size: [3, 5],
    },
    {
      id: "1c342126-46cb-4e7a-9225-81121066b3a3",
      title: "Property name here",
      img: "https://images.pexels.com/photos/3555615/pexels-photo-3555615.jpeg",
      price: "₱3,250",
      address: "Provido Village City Heights, General Santos City.",
      bed: 3,
      bathroom: 2,
      size: [3, 5],
    },
    {
      id: "19b5c09d-ad7e-4179-aa5a-0d3367194aa8",
      title: "Property name here",
      img: "https://images.pexels.com/photos/28272345/pexels-photo-28272345.jpeg",
      price: "₱8,000",
      address: "Provido Village City Heights, General Santos City.",
      bed: 3,
      bathroom: 2,
      size: [3, 5],
    },
    {
      id: "d66eec1c-5a6b-409b-9886-84ab35a5b976",
      title: "Property name here",
      img: "https://images.pexels.com/photos/4839348/pexels-photo-4839348.jpeg",
      price: "₱5,300",
      address: "Provido Village City Heights, General Santos City.",
      bed: 3,
      bathroom: 2,
      size: [3, 5],
    },
    {
      id: "0f6bd04d-6f70-43f0-8daa-034c5718f50c",
      title: "Property name here",
      img: "https://images.pexels.com/photos/5644337/pexels-photo-5644337.jpeg",
      price: "₱3,250",
      address: "Provido Village City Heights, General Santos City.",
      bed: 3,
      bathroom: 2,
      size: [3, 5],
    },
    {
      id: "a24b4ad1-69e7-448d-ab47-d651d08085e1",
      title: "Property name here",
      img: "https://images.pexels.com/photos/24245793/pexels-photo-24245793.jpeg",
      price: "₱8,000",
      address: "Provido Village City Heights, General Santos City.",
      bed: 3,
      bathroom: 2,
      size: [3, 5],
    },
    {
      id: "e0e177a7-40c1-49d6-9626-d6ee0a6bb6be",
      title: "Property name here",
      img: "https://images.pexels.com/photos/5524166/pexels-photo-5524166.jpeg",
      price: "₱5,300",
      address: "Provido Village City Heights, General Santos City.",
      bed: 3,
      bathroom: 2,
      size: [3, 5],
    },
    {
      id: "8427dea3-3e03-4310-ba3a-790d40a620f2",
      title: "Property name here",
      img: "https://images.pexels.com/photos/6035315/pexels-photo-6035315.jpeg",
      price: "₱3,250",
      address: "Provido Village City Heights, General Santos City.",
      bed: 3,
      bathroom: 2,
      size: [3, 5],
    },
    {
      id: "53e9e26f-4e2f-46fe-aba4-64d866e7a2a3",
      title: "Property name here",
      img: "https://images.pexels.com/photos/11018238/pexels-photo-11018238.jpeg",
      price: "₱8,000",
      address: "Provido Village City Heights, General Santos City.",
      bed: 3,
      bathroom: 2,
      size: [3, 5],
    },
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
      <div className="mt-16 gap-4 grid grid-cols-3">
        {properties.map((property, index) => (
          /* eslint-disable no-console */
          <Card
            key={index}
            isPressable
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

      {/* Pagination */}
      <div className="flex items-center justify-center mt-16 mb-24">
        <Pagination isCompact showControls initialPage={1} total={10} />
      </div>
    </div>
  );
};
