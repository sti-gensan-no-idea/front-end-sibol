import { Input } from "@heroui/react";
import { NavBar } from "@/widget/navbar";
import { IconSearch } from "@tabler/icons-react";
import { AgentsTabAgentsFilter } from "@/widget/agents-tab-agents-filter";
import agent1 from "@/assets/images/agent1.png";
import agent2 from "@/assets/images/agent2.png";
import agent3 from "@/assets/images/agent3.png";
import agent4 from "@/assets/images/agent4.png";
import AgentModal from "@/widget/agents-tab-agent-modal";

export const FindAgents = () => {
  const sampleData = [
    {
      name: "Sarah Miller",
      number: "(+63) 9023396053",
      img: agent1,
      email: "SarahMiller@gmail.com",
    },
    {
      name: "David Chen",
      number: "(+63) 902 339 6053",
      img: agent2,
      email: "DavidChen@gmail.com",
    },
    {
      name: "Emily Rodriguez",
      number: "(+63) 902 339 6053 ",
      img: agent3,
      email: "EmilyRodriguez@gmail.com",
    },
    {
      name: "Michael Johnson",
      number: "(+63) 902 339 6053",
      img: agent4,
      email: "MichaelJohnson@gmail.com",
    },
    {
      name: "Sarah Miller",
      number: "(+63) 9023396053",
      img: agent1,
      email: "SarahMiller@gmail.com",
    },
    {
      name: "David Chen",
      number: "(+63) 902 339 6053",
      img: agent2,
      email: "DavidChen@gmail.com",
    },
    {
      name: "Emily Rodriguez",
      number: "(+63) 902 339 6053 ",
      img: agent3,
      email: "EmilyRodriguez@gmail.com",
    },
    {
      name: "Michael Johnson",
      number: "(+63) 902 339 6053",
      img: agent4,
      email: "MichaelJohnson@gmail.com",
    },
  ];

  return (
    <main className="bg-white">
      <NavBar />
      <div className="max-w-7xl mx-auto w-full py-15 px-5 lg:px-0 flex flex-col gap-5">
        <h1 className="text-3xl ">Find an Agents</h1>
        <p className="max-w-prose text-gray-600">
          You can find a real estate agent that is near your
          <br /> area to cater your inquiries and site viewings immdiately.
        </p>

        <Input
          startContent={<IconSearch className="w-5 h-5 text-gray-400" />}
          placeholder="Search for agents"
          className="rounded-lg bg-gray-50 w-auto"
          variant="flat"
        />
        <AgentsTabAgentsFilter />

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {sampleData.map((data, index) => (
            <AgentModal
              name={data.name}
              number={data.number}
              img={data.img}
              key={index}
              email={data.email}
            />
          ))}
        </div>
      </div>
    </main>
  );
};
