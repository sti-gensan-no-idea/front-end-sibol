import { Button, Chip } from "@heroui/react";
import {
  Icon360View,
  IconBookmark,
  IconCalendar,
  IconPhone,
} from "@tabler/icons-react";

import { properties } from "@/data/properties";

export const ClientBookmark = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 rounded-large shadow-medium bg-white">
      {/* Header */}
      <div className="flex items-center md:items-start justify-between">
        <div className="flex items-center">
          <IconBookmark className="text-gray-500" size={26} />
          <span className="text-lg font-bold ml-2 text-foreground-700">
            Bookmark
          </span>
        </div>
      </div>

      <ul className="mt-4 space-y-6">
        {properties.map((item, index) => (
          <li key={index} className="flex h-48 justify-start items-start gap-4">
            <div className="relative h-full aspect-video">
              <img
                alt={item.title}
                className="bg-gray-100 rounded-medium w-full h-full object-cover"
                src={item.image}
              />
              <div className="absolute bottom-0 right-0 px-4 py-2 bg-black/75 text-white rounded-br-large rounded-tl-large">
                <Icon360View />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <span className="text-foreground-700 font-semibold text-lg">
                {item.title}
              </span>
              <span className="text-foreground-500 text-sm">
                {item.address}
              </span>
              <div className="flex items-center gap-2 text-foreground-500 text-sm mt-2">
                <Chip color="success" size="sm" variant="flat">
                  {item.status}
                </Chip>
                <span>{item.details}</span>
              </div>
              <span className="text-2xl text-foreground-700 mt-4 font-semibold">
                {item.price}
              </span>

              {/* Action buttons */}
              <div className="flex items-center gap-2 mt-2">
                <Button isIconOnly variant="flat">
                  <IconBookmark />
                </Button>
                <Button
                  className="w-fit"
                  startContent={<IconCalendar />}
                  variant="flat"
                >
                  Schedule Viewing
                </Button>
                <Button
                  className="w-fit"
                  startContent={<IconPhone />}
                  variant="flat"
                >
                  Contact Agent
                </Button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
