import { useCallback, useState } from "react";
import { Button, Chip, Input } from "@heroui/react";
import {
  IconBuildingCommunity,
  IconTrendingUp,
  IconTrendingDown,
  IconFilter,
  IconSearch,
} from "@tabler/icons-react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

export const AgentDashboardContent = () => {
  const [_, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_API_URL,
  });

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds({
      lat: 3.745,
      lng: 38.523,
    });

    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  return (
    <div className="container mx-auto pt-7 pr-8 pb-8 pl-20">
      {/* Cards */}
      <div className="grid grid-cols-3 gap-4">
        {/* Card */}
        <div className="p-8 rounded-large shadow-small bg-white">
          <div className="flex items-center gap-4">
            <div className="bg-gray-200 w-12 h-12 flex items-center justify-center rounded-full">
              <IconBuildingCommunity className="text-foreground-700" />
            </div>
            <span className="text-2xl font-bold">Total Property</span>
          </div>

          {/* Card Content */}
          <div className="flex items-center justify-between mt-8">
            <span className="text-4xl font-bold">1.500</span>
            <div className="flex items-center justify-end gap-3">
              <div className="flex items-center justify-center">
                <Chip
                  className="flex items-center"
                  color="success"
                  size="sm"
                  startContent={<IconTrendingUp size={18} />}
                  variant="flat"
                >
                  20%
                </Chip>
              </div>
              <span className="text-foreground-500">
                Last month total 1.050
              </span>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="p-8 rounded-large shadow-small bg-white">
          <div className="flex items-center gap-4">
            <div className="bg-gray-200 w-12 h-12 flex items-center justify-center rounded-full">
              <IconBuildingCommunity className="text-foreground-700" />
            </div>
            <span className="text-2xl font-bold">Number of Sales</span>
          </div>

          {/* Card Content */}
          <div className="flex items-center justify-between mt-8">
            <span className="text-4xl font-bold">320</span>
            <div className="flex items-center justify-end gap-3">
              <div className="flex items-center justify-center">
                <Chip
                  className="flex items-center"
                  color="danger"
                  size="sm"
                  startContent={<IconTrendingDown size={18} />}
                  variant="flat"
                >
                  20%
                </Chip>
              </div>
              <span className="text-foreground-500">Last month total 950</span>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="p-8 rounded-large shadow-small bg-white">
          <div className="flex items-center gap-4">
            <div className="bg-gray-200 w-12 h-12 flex items-center justify-center rounded-full">
              <IconBuildingCommunity className="text-foreground-700" />
            </div>
            <span className="text-2xl font-bold">Total Sales</span>
          </div>

          {/* Card Content */}
          <div className="flex items-center justify-between mt-8">
            <span className="text-4xl font-bold">₱ 150k</span>
            <div className="flex items-center justify-end gap-3">
              <div className="flex items-center justify-center">
                <Chip
                  className="flex items-center"
                  color="success"
                  size="sm"
                  startContent={<IconTrendingUp size={18} />}
                  variant="flat"
                >
                  20%
                </Chip>
              </div>
              <span className="text-foreground-500">
                Last month total 1.050
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-3 mt-8 gap-4">
        <div className="col-span-2 p-4 rounded-large shadow-small">
          <div className="flex items-center justify-between">
            <span className="font-bold text-xl flex ml-3">Recent Listings</span>
            <div className="flex items-center">
              <Input
                className="mr-3"
                placeholder="Search"
                startContent={<IconSearch />}
                variant="bordered"
              />
              <Button isIconOnly radius="full" variant="light">
                <IconFilter className="text-foreground-700" />
              </Button>
            </div>
          </div>
        </div>

        {/* Map Preview */}
        <div className="bg-white rounded-2xl shadow-medium shadow-gray-300 flex flex-col z-10 overflow-hidden">
          <div className="min-h-96 w-full">
            {isLoaded ? (
              <GoogleMap
                center={{
                  lat: 3.745,
                  lng: 38.523,
                }}
                mapContainerStyle={{
                  width: "100%",
                  height: "100%",
                }}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
              >
                {/* Child components, such as markers, info windows, etc. */}
                <></>
              </GoogleMap>
            ) : (
              <></>
            )}
          </div>
          <div className="bg-white pl-4 pr-4 pb-4">
            <span className="text-sm text-foreground-500">
              Zone 5-B Provido Village City Heights, General Santos City.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
