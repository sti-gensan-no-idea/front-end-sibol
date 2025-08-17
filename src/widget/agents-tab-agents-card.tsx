export interface Agent {
  name: string;
  number: string;
  img: string;
}

export const AgentsTabAgentsCard = ({ name, number, img }: Agent) => {
  return (
    <div className="flex flex-col items-center mb-5">
      <img src={img} alt="agent-image" />
      <p className="text-gray-900">{name}</p>
      <p className="text-gray-500">{number}</p>
    </div>
  );
};
