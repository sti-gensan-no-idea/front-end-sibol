import {
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { IconAward, IconStarFilled } from "@tabler/icons-react";

import { topPerformingAgents } from "@/data/top-performing-agents";

export const TopPerformingAgent = () => {
  return (
    <div className="container mx-auto mt-4 bg-white rounded-large shadow-medium p-8">
      <div className="flex items-center">
        <IconAward className="text-gray-500" size={26} />
        <span className="text-lg font-bold ml-2 text-foreground-700">
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
            <TableRow key={index} className="hover:bg-gray-100 cursor-pointer">
              <TableCell className="flex gap-5">
                <Avatar radius="full" size="md" src={agent.avatar} />
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
    </div>
  );
};
