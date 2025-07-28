import { Tabs, Tab } from "@heroui/react";
import { IconChartLine, IconCardboards, IconSearch } from "@tabler/icons-react";
import { useSearchParams } from "react-router-dom";

import { PropSearchContent } from "./prop-search-content";
import { PropTourContent } from "./prop-virtual-tour-content";
import { PropInsightsContent } from "./prop-ai-chat-content";

export const PropertiesTab = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") || "search_properties";

  const handleTabChange = (key: React.Key) => {
    setSearchParams({ tab: String(key) });
  };

  return (
    <div className="flex w-full flex-col p-8 container mx-auto">
      <Tabs
        aria-label="Options"
        color="primary"
        selectedKey={tab}
        onSelectionChange={handleTabChange}
      >
        <Tab
          key="search_properties"
          title={
            <div className="flex items-center space-x-2">
              <IconSearch /> <span>Property Search</span>
            </div>
          }
        >
          <PropSearchContent />
        </Tab>
        <Tab
          key="virtual_tour"
          title={
            <div className="flex items-center space-x-2">
              <IconCardboards /> <span>Virtual Tours</span>
            </div>
          }
        >
          <PropTourContent />
        </Tab>
        <Tab
          key="insights"
          title={
            <div className="flex items-center space-x-2">
              <IconChartLine /> <span>Market Insights and Analytics</span>
            </div>
          }
        >
          <PropInsightsContent />
        </Tab>
      </Tabs>
    </div>
  );
};
