import { useState } from "react";
import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Divider,
  Badge,
} from "@heroui/react";
import {
  IconAward,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconMapPinFilled,
  IconMessage2,
  IconPhoneFilled,
  IconRosetteDiscountCheckFilled,
  IconStarFilled,
} from "@tabler/icons-react";

import { topPerformingAgents } from "@/data/top-performing-agents";

type Agent = (typeof topPerformingAgents)[number];

export const TopPerformingAgent = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const handleRowClick = (agent: Agent) => {
    setSelectedAgent(agent);
    onOpen();
  };

  return (
    <div className="container mx-auto bg-white rounded-large shadow-medium p-8">
      <div className="flex items-center">
        <IconAward className="text-gray-500" size={26} />
        <span className="text-lg font-semibold ml-2 text-foreground-700">
          Best Performing Agents
        </span>
      </div>

      <Table removeWrapper aria-label="Top Performing Agents" className="mt-8">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>ACTIVE LEADS</TableColumn>
          <TableColumn>CLOSED DEALS</TableColumn>
          <TableColumn>RATING</TableColumn>
        </TableHeader>
        <TableBody>
          {topPerformingAgents.map((agent, index) => (
            <TableRow
              key={index}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => handleRowClick(agent)}
            >
              <TableCell className="flex gap-5">
                <Badge
                  isOneChar
                  color="primary"
                  content={<IconRosetteDiscountCheckFilled size={18} />}
                  placement="bottom-right"
                  shape="circle"
                  variant="faded"
                >
                  <Avatar radius="full" size="md" src={agent.avatar} />
                </Badge>
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="font-semibold leading-none text-default-700 text-medium">
                    {agent.name}
                  </h4>
                  <h5 className="text-small tracking-tight text-default-500">
                    {agent.email}
                  </h5>
                </div>
              </TableCell>
              <TableCell>{agent.leads}</TableCell>
              <TableCell>{agent.deals}</TableCell>
              <TableCell className="flex items-center">
                <IconStarFilled className="mr-2 text-yellow-500" size={18} />{" "}
                {agent.rating}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal */}
      <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1" />
              <ModalBody>
                {selectedAgent && (
                  <div className="flex flex-col items-center">
                    <Badge
                      isOneChar
                      color="primary"
                      content={<IconRosetteDiscountCheckFilled />}
                      placement="bottom-right"
                      shape="circle"
                      size="lg"
                      variant="faded"
                    >
                      <Avatar
                        className="w-30 h-30"
                        radius="full"
                        src={selectedAgent.avatar}
                      />
                    </Badge>
                    <span className="text-2xl mt-4 font-semibold text-foreground-700 flex items-center justify-center">
                      {selectedAgent.name}
                    </span>
                    <a
                      className="text-foreground-700 flex items-center justify-center text-center hover:underline"
                      href={`mailto:${selectedAgent.email}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {selectedAgent.email}
                    </a>

                    <SocialLinks agent={selectedAgent} />

                    <Divider className="mt-8" />
                    <a
                      className="mt-4 text-foreground-700 flex items-center w-full hover:underline"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        selectedAgent.address
                      )}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <IconMapPinFilled
                        className="mr-4 text-gray-500"
                        size={18}
                      />
                      {selectedAgent.address}
                    </a>
                    <a
                      className="mt-4 text-foreground-700 flex items-center w-full hover:underline"
                      href={`tel:${selectedAgent.phone}`}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <IconPhoneFilled
                        className="mr-4 text-gray-500"
                        size={18}
                      />
                      {selectedAgent.phone}
                    </a>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button
                  className="w-full"
                  startContent={<IconMessage2 />}
                  variant="flat"
                  onPress={onClose}
                >
                  Message
                </Button>
                <Button className="w-full" color="primary" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

// SocialLinks component inside the same file
const SocialLinks = ({ agent }: { agent: Agent }) => (
  <div className="flex gap-2 mt-4">
    {agent.facebook && (
      <Button
        isIconOnly
        aria-label="Facebook"
        href={agent.facebook}
        radius="full"
        rel="noopener noreferrer"
        target="_blank"
        variant="light"
      >
        <IconBrandFacebook />
      </Button>
    )}
    {agent.linkedin && (
      <Button
        isIconOnly
        aria-label="LinkedIn"
        href={agent.linkedin}
        radius="full"
        rel="noopener noreferrer"
        target="_blank"
        variant="light"
      >
        <IconBrandLinkedin />
      </Button>
    )}
    {agent.instagram && (
      <Button
        isIconOnly
        aria-label="Instagram"
        href={agent.instagram}
        radius="full"
        rel="noopener noreferrer"
        target="_blank"
        variant="light"
      >
        <IconBrandInstagram />
      </Button>
    )}
  </div>
);
