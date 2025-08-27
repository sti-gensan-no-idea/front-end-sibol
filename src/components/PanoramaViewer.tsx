import { useEffect, useRef, useState } from 'react';
import { 
  Modal, 
  ModalBody, 
  ModalContent, 
  ModalHeader,
  Button,
  Tabs,
  Tab,
  Card,
  CardBody,
  Chip
} from '@heroui/react';
import { 
  Icon360View, 
  IconX, 
  IconMaximize, 
  IconRotate,
  IconHome,
  IconChefHat,
  IconBed
} from '@tabler/icons-react';

// Import panorama images
import panorama1 from '@/assets/images/panorama_1.jpg';
import panoramaLivingRoom from '@/assets/images/panorama_living_room.jpg';
import panoramaKitchen from '@/assets/images/panorama_kitchen.jpg';
import panoramaBedRoom from '@/assets/images/panorama_bed_room.jpg';

interface PanoramaViewerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  propertyTitle?: string;
  initialRoom?: string;
}

interface PanoramaRoom {
  key: string;
  label: string;
  image: string;
  icon: React.ReactNode;
  description: string;
}

export const PanoramaViewer = ({ 
  isOpen, 
  onOpenChange, 
  propertyTitle = "Property",
  initialRoom = "overview" 
}: PanoramaViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentRoom, setCurrentRoom] = useState(initialRoom);
  const [isLoading, setIsLoading] = useState(true);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [lastMouseX, setLastMouseX] = useState(0);

  const rooms: PanoramaRoom[] = [
    {
      key: "overview",
      label: "Overview",
      image: panorama1,
      icon: <IconHome size={16} />,
      description: "Main view of the property"
    },
    {
      key: "living_room",
      label: "Living Room", 
      image: panoramaLivingRoom,
      icon: <IconHome size={16} />,
      description: "Spacious living area"
    },
    {
      key: "kitchen",
      label: "Kitchen",
      image: panoramaKitchen,
      icon: <IconChefHat size={16} />,
      description: "Modern kitchen setup"
    },
    {
      key: "bedroom",
      label: "Bedroom",
      image: panoramaBedRoom,
      icon: <IconBed size={16} />,
      description: "Comfortable bedroom"
    }
  ];

  const currentRoomData = rooms.find(room => room.key === currentRoom) || rooms[0];

  useEffect(() => {
    if (!isOpen || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsLoading(true);
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      // Set canvas size
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      setIsLoading(false);
      drawPanorama();
    };
    
    img.onerror = () => {
      setIsLoading(false);
      console.error('Failed to load panorama image');
    };

    img.src = currentRoomData.image;

    function drawPanorama() {
      if (!ctx || !img.complete) return;
      
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      
      // Clear canvas
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      
      // Calculate dimensions for panorama effect
      const imgAspectRatio = img.width / img.height;
      const canvasAspectRatio = canvasWidth / canvasHeight;
      
      let renderWidth = canvasWidth * 1.5; // Make wider for panorama effect
      let renderHeight = renderWidth / imgAspectRatio;
      
      if (renderHeight < canvasHeight) {
        renderHeight = canvasHeight;
        renderWidth = renderHeight * imgAspectRatio;
      }
      
      // Apply rotation offset
      const rotationOffset = (rotation / 360) * renderWidth;
      const x = -rotationOffset - (renderWidth - canvasWidth) / 2;
      const y = (canvasHeight - renderHeight) / 2;
      
      // Draw the panorama image
      ctx.drawImage(img, x, y, renderWidth, renderHeight);
      
      // Create a second copy for seamless rotation
      ctx.drawImage(img, x + renderWidth, y, renderWidth, renderHeight);
      
      // Add subtle vignette effect
      const gradient = ctx.createRadialGradient(
        canvasWidth / 2, canvasHeight / 2, 0,
        canvasWidth / 2, canvasHeight / 2, Math.max(canvasWidth, canvasHeight) / 2
      );
      gradient.addColorStop(0, 'rgba(0,0,0,0)');
      gradient.addColorStop(1, 'rgba(0,0,0,0.3)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    // Animation loop for smooth rotation
    let animationId: number;
    function animate() {
      drawPanorama();
      animationId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [currentRoom, rotation, isOpen]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setLastMouseX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - lastMouseX;
    setRotation(prev => (prev + deltaX * 0.5) % 360);
    setLastMouseX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleAutoRotate = () => {
    setRotation(prev => (prev + 45) % 360);
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="5xl"
      className="bg-black"
      classNames={{
        base: "bg-black",
        backdrop: "bg-black/90"
      }}
      hideCloseButton
    >
      <ModalContent className="bg-black text-white">
        {(onClose) => (
          <>
            <ModalHeader className="flex justify-between items-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <Icon360View size={24} className="text-blue-400" />
                <div>
                  <h3 className="text-lg font-semibold">{propertyTitle}</h3>
                  <p className="text-sm text-gray-300">{currentRoomData.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  isIconOnly
                  variant="flat"
                  onPress={handleAutoRotate}
                  className="bg-white/10 hover:bg-white/20"
                >
                  <IconRotate size={18} />
                </Button>
                <Button
                  isIconOnly
                  variant="flat"
                  onPress={onClose}
                  className="bg-white/10 hover:bg-white/20"
                >
                  <IconX size={18} />
                </Button>
              </div>
            </ModalHeader>

            <ModalBody className="p-0 relative">
              {/* Room Selector */}
              <div className="absolute top-4 left-4 z-10">
                <Tabs
                  selectedKey={currentRoom}
                  onSelectionChange={(key) => setCurrentRoom(key as string)}
                  variant="solid"
                  color="primary"
                  classNames={{
                    tabList: "bg-black/50 backdrop-blur-sm",
                    tab: "text-white",
                    tabContent: "text-white"
                  }}
                >
                  {rooms.map((room) => (
                    <Tab
                      key={room.key}
                      title={
                        <div className="flex items-center gap-2">
                          {room.icon}
                          <span className="hidden sm:inline">{room.label}</span>
                        </div>
                      }
                    />
                  ))}
                </Tabs>
              </div>

              {/* Loading indicator */}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-20">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
                    <p className="text-white">Loading 360° view...</p>
                  </div>
                </div>
              )}

              {/* Canvas for panorama */}
              <canvas
                ref={canvasRef}
                className="w-full h-[70vh] cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              />

              {/* Instructions */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <Card className="bg-black/50 backdrop-blur-sm border-white/20">
                  <CardBody className="p-3">
                    <div className="flex items-center gap-4 text-white text-sm">
                      <div className="flex items-center gap-2">
                        <IconRotate size={16} />
                        <span>Drag to rotate</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IconMaximize size={16} />
                        <span>Switch rooms above</span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </div>

              {/* Room info */}
              <div className="absolute top-20 right-4 z-10">
                <Chip 
                  variant="solid" 
                  color="primary" 
                  className="bg-blue-600/80 backdrop-blur-sm"
                >
                  {currentRoomData.label}
                </Chip>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
