import {
  Modal,
  ModalContent,
  ModalBody,
  Button,
  useDisclosure,
  Card,
  CardBody,
  Chip,
  Textarea,
  Input,
  Avatar,
  Divider,
} from "@heroui/react";
import Hero from "@/assets/images/img_hero_background.jpg";
import {
  IconCalendar,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";

export interface Agent {
  name: string;
  number: string;
  img: string;
  email: string;
}

export default function AgentModal({ name, number, img, email }: Agent) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} className="h-80 bg-white">
        <div className="flex flex-col items-center mb-5">
          <img src={img} alt="agent-image" />
          <p className="text-gray-900">{name}</p>
          <p className="text-gray-500">{number}</p>
        </div>
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="5xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody className="p-0">
                <div className="grid lg:grid-cols-2 gap-8 p-6 max-h-[80vh] overflow-auto">
                  <div className="space-y-6">
                    {/* Agent Profile Section */}
                    <Card className="shadow-sm">
                      <CardBody className="p-6">
                        <div className="flex flex-col sm:flex-row items-start gap-4">
                          <Avatar
                            src={img}
                            alt={`${name} profile picture`}
                            className="w-25 h-25 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h2 className="text-2xl font-bold text-foreground mb-1">
                              {name}
                            </h2>
                            <Chip
                              color="primary"
                              variant="flat"
                              size="sm"
                              className="mb-4"
                            >
                              Licensed Broker
                            </Chip>

                            <div className="space-y-3">
                              <div className="flex items-center gap-3 text-muted-foreground">
                                <IconPhone
                                  size={16}
                                  className="flex-shrink-0"
                                />
                                <a
                                  href={`tel:${number}`}
                                  className="hover:text-primary transition-colors"
                                  aria-label={`Call ${name} at ${number}`}
                                >
                                  {number}
                                </a>
                              </div>
                              <div className="flex items-center gap-3 text-muted-foreground">
                                <IconMail size={16} className="flex-shrink-0" />
                                <a
                                  href={`mailto:${email}`}
                                  className="hover:text-primary transition-colors truncate"
                                  aria-label={`Email ${name} at ${email}`}
                                >
                                  {email}
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>

                    <Divider />

                    {/* Listings Section */}
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-foreground">
                        Featured Listings
                      </h3>
                      <div className="flex flex-col gap-2">
                        <Card className="shadow-sm hover:shadow-md transition-shadow">
                          <CardBody className="p-4">
                            <div className="flex gap-4">
                              <img
                                src={Hero || "/placeholder.svg"}
                                alt="Property listing"
                                className="w-24 h-20 object-cover rounded-lg flex-shrink-0"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-foreground mb-2 line-clamp-2">
                                  House and Lot for Sale
                                </h4>
                                <div className="space-y-1 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <IconMapPin size={14} />
                                    <span>General Santos City</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <IconCalendar size={14} />
                                    <span>May 25, 2023</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardBody>
                        </Card>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Card className="shadow-sm h-fit">
                      <CardBody className="p-6">
                        <div className="mb-6">
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            Contact Agent
                          </h3>
                          <p className="text-muted-foreground">
                            Get in touch with {name} for more information
                          </p>
                        </div>

                        <form
                          className="space-y-4"
                          onSubmit={(e) => e.preventDefault()}
                        >
                          <Input
                            label="Full Name"
                            placeholder="Enter your full name"
                            size="md"
                            variant="bordered"
                            isRequired
                            aria-label="Your full name"
                          />
                          <Input
                            label="Email Address"
                            placeholder="Enter your email"
                            type="email"
                            size="md"
                            variant="bordered"
                            isRequired
                            aria-label="Your email address"
                          />
                          <Input
                            label="Phone Number"
                            placeholder="Enter your phone number"
                            type="tel"
                            size="md"
                            variant="bordered"
                            isRequired
                            aria-label="Your phone number"
                          />
                          <Textarea
                            label="Message"
                            placeholder="I'm interested in this property..."
                            minRows={4}
                            variant="bordered"
                            isRequired
                            aria-label="Your message to the agent"
                          />
                          <Button
                            color="primary"
                            size="lg"
                            className="w-full font-semibold"
                            type="submit"
                          >
                            Send Message
                          </Button>
                        </form>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
