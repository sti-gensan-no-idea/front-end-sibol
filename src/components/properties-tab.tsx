import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import {
  IconChartLine,
  IconCardboards,
  IconArrowsHorizontal,
  IconSearch,
} from "@tabler/icons-react";

import { PropSearchContent } from "./prop-search-content";
import { PropTourContent } from "./prop-virtual-tour-content";

export const PropertiesTab = () => {
  return (
    <div className="flex w-full flex-col p-8 container mx-auto">
      <Tabs aria-label="Options" color="primary">
        <Tab
          key="/prop-search"
          title={
            <div className="flex items-center space-x-2">
              <IconSearch /> <span>Property Search</span>
            </div>
          }
        >
          <PropSearchContent />
        </Tab>
        <Tab
          key="/prop-comparison"
          title={
            <div className="flex items-center space-x-2">
              <IconArrowsHorizontal /> <span>Property Comparison</span>
            </div>
          }
        >
          <Card>
            <CardBody>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </CardBody>
          </Card>
        </Tab>
        <Tab
          key="/virtual-tour"
          title={
            <div className="flex items-center space-x-2">
              <IconCardboards /> <span>Virtual Tours</span>
            </div>
          }
        >
          <PropTourContent />
        </Tab>
        <Tab
          key="/market-insights"
          title={
            <div className="flex items-center space-x-2">
              <IconChartLine /> <span>Market Insights and Analytics</span>
            </div>
          }
        >
          <Card>
            <CardBody>
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum.
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  );
};
