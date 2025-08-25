import { Button, Chip, Divider, Pagination, Spinner, Card, CardBody } from "@heroui/react";
import {
  Icon360View,
  IconBookmark,
  IconCalendar,
  IconPhone,
  IconAlertCircle,
  IconBookmarkOff,
} from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { 
  useGetBookmarksBookmarksGet, 
  useRemoveBookmarkBookmarksBookmarkIdDelete 
} from "@/lib/api/generated/atuna-client";
import { mapPropertyToCard, type PropertyCard } from "@/lib/mappers/property";

const ITEMS_PER_PAGE = 16;

export const ClientBookmark = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get("page") || "1", 10);
  const [page, setPage] = useState<number>(isNaN(initialPage) ? 1 : initialPage);

  // Fetch bookmarks from API
  const {
    data: bookmarksResponse,
    isLoading,
    error,
    refetch
  } = useGetBookmarksBookmarksGet({
    limit: ITEMS_PER_PAGE,
    offset: (page - 1) * ITEMS_PER_PAGE,
  });

  const removeBookmarkMutation = useRemoveBookmarkBookmarksBookmarkIdDelete();

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    queryParams.set("page", String(newPage));
    navigate(`${location.pathname}?${queryParams.toString()}`);
  };

  const handleRemoveBookmark = async (bookmarkId: string) => {
    try {
      await removeBookmarkMutation.mutateAsync({ bookmarkId });
      // Invalidate bookmarks query to refresh the list
      queryClient.invalidateQueries({ queryKey: ["getBookmarksBookmarksGet"] });
    } catch (error) {
      console.error("Failed to remove bookmark:", error);
    }
  };

  const handleScheduleViewing = (propertyId: string) => {
    // TODO: Implement site viewing scheduling
    console.log("Schedule viewing for property:", propertyId);
  };

  const handleContact = (propertyId: string) => {
    // TODO: Implement contact functionality
    console.log("Contact about property:", propertyId);
  };

  // Map bookmarks to properties (assuming bookmarks contain property data)
  const bookmarks = bookmarksResponse?.data?.items || [];
  const totalPages = bookmarksResponse?.data?.total ? Math.ceil(bookmarksResponse.data.total / ITEMS_PER_PAGE) : 1;

  if (isLoading) {
    return (
      <div className="container mx-auto w-full">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <Spinner size="lg" className="mb-4" />
            <p className="text-gray-600">Loading your bookmarks...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto w-full">
        <div className="flex justify-center items-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardBody className="p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconAlertCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                Failed to Load Bookmarks
              </h3>
              <p className="text-gray-600 mb-4">
                There was an error loading your bookmarks. Please try again.
              </p>
              <Button color="primary" onPress={() => refetch()}>
                Try Again
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="container mx-auto w-full">
        <div className="flex justify-center items-center min-h-[400px]">
          <Card className="w-full max-w-md">
            <CardBody className="p-8 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <IconBookmarkOff className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900">
                No Bookmarks Yet
              </h3>
              <p className="text-gray-600 mb-4">
                You haven't bookmarked any properties yet. Start browsing to save your favorites!
              </p>
              <Button 
                color="primary" 
                onPress={() => navigate("/properties")}
              >
                Browse Properties
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {bookmarks.map((bookmark) => (
          <BookmarkCard
            key={bookmark.id}
            bookmark={bookmark}
            onRemove={handleRemoveBookmark}
            onScheduleViewing={handleScheduleViewing}
            onContact={handleContact}
            isRemoving={removeBookmarkMutation.isPending}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex justify-center">
          <Pagination
            color="primary"
            page={page}
            size="lg"
            total={totalPages}
            onChange={handlePageChange}
          />
        </div>
      )}
    </div>
  );
};

interface BookmarkCardProps {
  bookmark: any; // TODO: Replace with proper BookmarkResponse type when available
  onRemove: (bookmarkId: string) => void;
  onScheduleViewing: (propertyId: string) => void;
  onContact: (propertyId: string) => void;
  isRemoving: boolean;
}

const BookmarkCard = ({ 
  bookmark, 
  onRemove, 
  onScheduleViewing, 
  onContact,
  isRemoving 
}: BookmarkCardProps) => {
  // For now, create a mock property from bookmark data
  // TODO: Replace with actual property data from bookmark when API structure is known
  const property: PropertyCard = {
    id: bookmark.property_id || bookmark.id,
    title: bookmark.title || "Bookmarked Property",
    address: bookmark.address || "Location not specified",
    image: `https://picsum.photos/seed/bookmark-${bookmark.id}/400/300`,
    details: bookmark.details || "Property details",
    price: bookmark.price || "Price on request",
    status: "Available", // Default status
  };

  return (
    <div className="bg-white rounded-2xl shadow-small overflow-hidden flex flex-col">
      <div className="relative h-48">
        <img
          alt={property.title}
          className="w-full h-full object-cover bg-gray-300"
          src={property.image}
          onError={(e) => {
            e.currentTarget.src = `https://via.placeholder.com/400x300/f0f0f0/666666?text=${encodeURIComponent(property.title)}`;
          }}
        />
        <div className="absolute bottom-0 right-0 px-3 py-2 bg-black/70 text-white rounded-tl-xl">
          <Icon360View size={20} />
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <span className="text-lg font-semibold text-gray-800">
          {property.title}
        </span>
        <span className="text-sm text-gray-500">{property.address}</span>

        <div className="flex items-center gap-2 text-sm mt-2">
          <Chip
            color={property.status === "Available" ? "success" : "danger"}
            size="sm"
            variant="flat"
          >
            {property.status}
          </Chip>
          <span className="text-gray-500">{property.details}</span>
        </div>

        <span className="text-xl font-bold text-primary mt-3">
          {property.price}
        </span>

        {/* Action buttons */}
        <Divider className="mt-4" />
        <div className="flex items-center gap-2 mt-4">
          <Button 
            isIconOnly 
            radius="full" 
            variant="flat"
            color="danger"
            isLoading={isRemoving}
            onPress={() => onRemove(bookmark.id)}
            title="Remove bookmark"
          >
            <IconBookmark />
          </Button>
          <div className="grid grid-cols-2 gap-2 w-full">
            <Button 
              startContent={<IconCalendar />} 
              variant="flat"
              onPress={() => onScheduleViewing(property.id)}
            >
              Schedule
            </Button>
            <Button 
              startContent={<IconPhone />} 
              variant="flat"
              onPress={() => onContact(property.id)}
            >
              Contact
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
