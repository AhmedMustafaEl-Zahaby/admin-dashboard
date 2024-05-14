import { User } from "@/graphql/schema.types";
import React from "react";
type Props = {
  id: string;
  title: string;
  updatedAt: string;
  dueDate?: string;
  users?: {
    id: string;
    name: string;
    avatarUrl?: User["avatarUrl"];
  }[];
};
const ProjectCard = ({
  id,
  title,
  dueDate,
  users,
}: React.PropsWithChildren<Props>) => {
  return <div>ProjectCard</div>;
};

export default ProjectCard;
