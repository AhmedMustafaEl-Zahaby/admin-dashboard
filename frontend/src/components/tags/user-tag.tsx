import { Space, Tag } from "antd";

import { User } from "@/graphql/schema.types";
import Avatar from "../custom-avatar";

type Props = {
  user: User;
};

// display a user's avatar and name in a tag
export const UserTag = ({ user }: Props) => {
  return (
    <Tag
      key={user.id}
      style={{
        padding: 2,
        paddingRight: 8,
        borderRadius: 24,
        lineHeight: "unset",
        marginRight: "unset",
      }}
    >
      <Space size={4}>
        <Avatar
          src={user.avatarUrl}
          name={user.name}
          style={{ display: "inline-flex" }}
        />
        {user.name}
      </Space>
    </Tag>
  );
};
