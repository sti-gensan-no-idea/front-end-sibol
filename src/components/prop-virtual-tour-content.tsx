import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { list } from "postcss";

export const PropTourContent = () => {
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
      title: "Property name here",
      img: "https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg",
      price: "$5.50",
      address: "Provido Village City Heights, General Santos City.",
      bed: 3,
      bathroom: 2,
      size: [3, 5],
    },
    {
      title: "Property name here",
      img: "https://images.pexels.com/photos/3555615/pexels-photo-3555615.jpeg",
      price: "$3.00",
      address: "Provido Village City Heights, General Santos City.",
      bed: 3,
      bathroom: 2,
      size: [3, 5],
    },
    {
      title: "Property name here",
      img: "https://images.pexels.com/photos/28272345/pexels-photo-28272345.jpeg",
      price: "$10.00",
      address: "Provido Village City Heights, General Santos City.",
      bed: 3,
      bathroom: 2,
      size: [3, 5],
    },
    {
      title: "Property name here",
      img: "https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg",
      price: "$5.50",
      address: "Provido Village City Heights, General Santos City.",
      bed: 3,
      bathroom: 2,
      size: [3, 5],
    },
    {
      title: "Property name here",
      img: "https://images.pexels.com/photos/3555615/pexels-photo-3555615.jpeg",
      price: "$3.00",
      address: "Provido Village City Heights, General Santos City.",
      bed: 3,
      bathroom: 2,
      size: [3, 5],
    },
    {
      title: "Property name here",
      img: "https://images.pexels.com/photos/28272345/pexels-photo-28272345.jpeg",
      price: "$10.00",
      address: "Provido Village City Heights, General Santos City.",
      bed: 3,
      bathroom: 2,
      size: [3, 5],
    },
    {
      title: "Property name here",
      img: "https://images.pexels.com/photos/221540/pexels-photo-221540.jpeg",
      price: "$5.50",
      address: "Provido Village City Heights, General Santos City.",
      bed: 3,
      bathroom: 2,
      size: [3, 5],
    },
    {
      title: "Property name here",
      img: "https://images.pexels.com/photos/3555615/pexels-photo-3555615.jpeg",
      price: "$3.00",
      address: "Provido Village City Heights, General Santos City.",
      bed: 3,
      bathroom: 2,
      size: [3, 5],
    },
    {
      title: "Property name here",
      img: "https://images.pexels.com/photos/28272345/pexels-photo-28272345.jpeg",
      price: "$10.00",
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
            onPress={() => console.log("item pressed")}
          >
            <CardBody className="overflow-visible p-0">
              <img
                alt={property.title}
                className="w-full object-cover h-[232px]"
                src={property.img}
                width="100%"
              />
            </CardBody>
            <CardFooter className="p-6">
              <div className="flex flex-col w-full">
                <div className="flex items-center">
                  <span className="flex text-2xl text-primary">
                    {property.price}
                  </span>
                  <span className="text-foreground-700 ml-2">/ month</span>
                </div>
                <span className="flex font-bold text-4xl mt-3">
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
