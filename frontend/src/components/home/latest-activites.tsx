import { UnorderedListOutlined } from "@ant-design/icons";
import { Card, List, Space } from "antd";
import React from "react";
import { Text } from "../text";
import LatestActivitiesSkeleton from "../skeleton/latest-activities";
import { useList } from "@refinedev/core";
import {
  DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
  DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
} from "@/graphql/queries";
import dayjs from "dayjs";
import Avatar from "../custom-avatar";

const DashboardLatestActivites = () => {
  const {
    data: audit,
    isLoading: isLoadingAudit,
    isError,
  } = useList({
    resource: "audits",
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_AUDITS_QUERY,
    },
  });

  const dealsIds = audit?.data.map((audit) => audit?.targetId);
  const { data: deals, isLoading: isLoadingDeals } = useList({
    resource: "deals",
    queryOptions: {
      enabled: !!dealsIds?.length,
    },
    pagination: {
      mode: "off",
    },
    filters: [{ field: "id", operator: "in", value: dealsIds }],
    meta: {
      gqlQuery: DASHBOARD_LATEST_ACTIVITIES_DEALS_QUERY,
    },
  });

  if (isError) {
    console.log(isError);
    return null;
  }

  const isLoading = isLoadingAudit || isLoadingDeals;
  return (
    <Card
      styles={{
        header: {
          padding: "16px",
        },
        body: {
          padding: "0 1rem",
        },
      }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <UnorderedListOutlined />
          <Text
            size="sm"
            style={{
              marginLeft: "0.5rem",
            }}
          >
            Latest Activities
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <List
          itemLayout="horizontal"
          dataSource={Array.from({ length: 5 }).map((_, index) => ({
            id: index,
          }))}
          renderItem={(_, index) => <LatestActivitiesSkeleton key={index} />}
        />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={audit?.data}
          renderItem={(item) => {
            const deal =
              deals?.data.find((deal) => deal.id === String(item.targetId)) ||
              undefined;
            return (
              <List.Item>
                <List.Item.Meta
                  title={dayjs(item.createdAt).format("MMM DD, YYYY - HH:mm")}
                  avatar={
                    <Avatar
                      shape="square"
                      size={48}
                      src={deal?.company?.avatarUrl}
                      name={deal?.company?.name}
                    />
                  }
                  description={
                    <Space size={4}>
                      <Text strong>{item.user?.name}</Text>
                      <Text size="sm">
                        {item.action === "CREATE" ? "created" : "moved"}
                      </Text>
                      <Text strong>{deal?.title}</Text>
                      <Text>deal</Text>
                      <Text>{item.action === "CREATE" ? "in" : "to"}</Text>
                      <Text strong>{deal?.stage?.title}</Text>
                    </Space>
                  }
                />
              </List.Item>
            );
          }}
        />
      )}
    </Card>
  );
};
export default DashboardLatestActivites;
