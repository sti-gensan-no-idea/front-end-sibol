import {
  Avatar,
  Button,
  Chip,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import {
  IconArrowUp,
  IconBuildingCommunity,
  IconCircleCheck,
  IconCoins,
  IconPlus,
  IconSearch,
  IconUsersGroup,
} from "@tabler/icons-react";

interface CardTeamInterface {
  name: string;
  location: string;
  totalProperties: number;
  agents: string[];
  onClick?: () => void;
}

export const TeamModal = ({
  isOpen,
  onClose,
  team,
}: {
  isOpen: boolean;
  onClose: () => void;
  team: CardTeamInterface;
}) => {
  return (
    <Modal
      backdrop="blur"
      isDismissable={false}
      isOpen={isOpen}
      scrollBehavior="inside"
      size="5xl"
      onClose={onClose}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>{team.name}</ModalHeader>
            <ModalBody>
              <div
                className="flex flex-col p-8 container mx-auto"
                style={{ backgroundColor: "#eae9e3" }}
              >
                <div className="grid grid-cols-4 gap-4">
                  <div className="p-6 rounded-large bg-white shadow-medium flex flex-col">
                    <div className="flex items-center justify-between">
                      <span>Total Agents</span>
                      <div className="bg-blue-100 w-12 h-12 flex items-center justify-center rounded-full">
                        <IconUsersGroup className="text-blue-500" />
                      </div>
                    </div>
                    <span className="text-3xl font-bold">12</span>
                    <Chip
                      className="mt-4"
                      color="success"
                      startContent={<IconArrowUp size={18} />}
                    >
                      2 new this month
                    </Chip>
                  </div>

                  <div className="p-6 rounded-large bg-white shadow-medium flex flex-col">
                    <div className="flex items-center justify-between">
                      <span>Active Listings</span>
                      <div className="bg-orange-100 w-12 h-12 flex items-center justify-center rounded-full">
                        <IconBuildingCommunity className="text-orange-500" />
                      </div>
                    </div>
                    <span className="text-3xl font-bold">48</span>
                    <Chip
                      className="mt-4"
                      color="success"
                      startContent={<IconArrowUp size={18} />}
                    >
                      5 new this week
                    </Chip>
                  </div>

                  <div className="p-6 rounded-large bg-white shadow-medium flex flex-col">
                    <div className="flex items-center justify-between">
                      <span>Properties Sold</span>
                      <div className="bg-green-100 w-12 h-12 flex items-center justify-center rounded-full">
                        <IconCircleCheck className="text-green-500" />
                      </div>
                    </div>
                    <span className="text-3xl font-bold">23</span>
                    <Chip
                      className="mt-4"
                      color="success"
                      startContent={<IconArrowUp size={18} />}
                    >
                      12% increase
                    </Chip>
                  </div>

                  <div className="p-6 rounded-large bg-white shadow-medium flex flex-col">
                    <div className="flex items-center justify-between">
                      <span>Revenue</span>
                      <div className="bg-yellow-100 w-12 h-12 flex items-center justify-center rounded-full">
                        <IconCoins className="text-yellow-500" />
                      </div>
                    </div>
                    <span className="text-3xl font-bold">₱18.5M</span>
                    <Chip
                      className="mt-4"
                      color="success"
                      startContent={<IconArrowUp size={18} />}
                    >
                      8% increase
                    </Chip>
                  </div>
                </div>

                <div className="rounded-large bg-white shadow-small p-4 mt-8 flex items-center">
                  <form
                    action="#"
                    className="flex items-center w-full"
                    method="get"
                  >
                    <Input
                      placeholder="Search agent..."
                      size="lg"
                      startContent={<IconSearch />}
                    />
                    <Button isIconOnly className="hidden" type="submit">
                      <IconSearch />
                    </Button>
                  </form>
                  <Button
                    className="ml-4"
                    color="primary"
                    startContent={<IconPlus />}
                  >
                    Add Agent
                  </Button>
                </div>

                <Table
                  aria-label="Example static collection table"
                  className="mt-8"
                >
                  <TableHeader>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>ROLE</TableColumn>
                    <TableColumn>PROPERTIES</TableColumn>
                    <TableColumn>SOLD</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                  </TableHeader>
                  <TableBody>
                    <TableRow key="1">
                      <TableCell className="flex gap-5">
                        <Avatar
                          radius="full"
                          size="sm"
                          src="https://heroui.com/avatars/avatar-1.png"
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            Zoey Lang
                          </h4>
                          <h5 className="text-small tracking-tight text-default-400">
                            zoeylang@gmail.com
                          </h5>
                        </div>
                      </TableCell>
                      <TableCell>Agent</TableCell>
                      <TableCell>16</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>
                        <Switch size="sm" />
                      </TableCell>
                    </TableRow>

                    <TableRow key="1">
                      <TableCell className="flex gap-5">
                        <Avatar
                          radius="full"
                          size="sm"
                          src="https://heroui.com/avatars/avatar-1.png"
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            Zoey Lang
                          </h4>
                          <h5 className="text-small tracking-tight text-default-400">
                            zoeylang@gmail.com
                          </h5>
                        </div>
                      </TableCell>
                      <TableCell>Agent</TableCell>
                      <TableCell>16</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>
                        <Switch size="sm" />
                      </TableCell>
                    </TableRow>

                    <TableRow key="1">
                      <TableCell className="flex gap-5">
                        <Avatar
                          radius="full"
                          size="sm"
                          src="https://heroui.com/avatars/avatar-1.png"
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            Zoey Lang
                          </h4>
                          <h5 className="text-small tracking-tight text-default-400">
                            zoeylang@gmail.com
                          </h5>
                        </div>
                      </TableCell>
                      <TableCell>Agent</TableCell>
                      <TableCell>16</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>
                        <Switch size="sm" />
                      </TableCell>
                    </TableRow>

                    <TableRow key="1">
                      <TableCell className="flex gap-5">
                        <Avatar
                          radius="full"
                          size="sm"
                          src="https://heroui.com/avatars/avatar-1.png"
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            Zoey Lang
                          </h4>
                          <h5 className="text-small tracking-tight text-default-400">
                            zoeylang@gmail.com
                          </h5>
                        </div>
                      </TableCell>
                      <TableCell>Agent</TableCell>
                      <TableCell>16</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>
                        <Switch size="sm" />
                      </TableCell>
                    </TableRow>

                    <TableRow key="1">
                      <TableCell className="flex gap-5">
                        <Avatar
                          radius="full"
                          size="sm"
                          src="https://heroui.com/avatars/avatar-1.png"
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            Zoey Lang
                          </h4>
                          <h5 className="text-small tracking-tight text-default-400">
                            zoeylang@gmail.com
                          </h5>
                        </div>
                      </TableCell>
                      <TableCell>Agent</TableCell>
                      <TableCell>16</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>
                        <Switch size="sm" />
                      </TableCell>
                    </TableRow>
                    <TableRow key="1">
                      <TableCell className="flex gap-5">
                        <Avatar
                          radius="full"
                          size="sm"
                          src="https://heroui.com/avatars/avatar-1.png"
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            Zoey Lang
                          </h4>
                          <h5 className="text-small tracking-tight text-default-400">
                            zoeylang@gmail.com
                          </h5>
                        </div>
                      </TableCell>
                      <TableCell>Agent</TableCell>
                      <TableCell>16</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>
                        <Switch size="sm" />
                      </TableCell>
                    </TableRow>
                    <TableRow key="1">
                      <TableCell className="flex gap-5">
                        <Avatar
                          radius="full"
                          size="sm"
                          src="https://heroui.com/avatars/avatar-1.png"
                        />
                        <div className="flex flex-col gap-1 items-start justify-center">
                          <h4 className="text-small font-semibold leading-none text-default-600">
                            Zoey Lang
                          </h4>
                          <h5 className="text-small tracking-tight text-default-400">
                            zoeylang@gmail.com
                          </h5>
                        </div>
                      </TableCell>
                      <TableCell>Agent</TableCell>
                      <TableCell>16</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell>
                        <Switch size="sm" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
