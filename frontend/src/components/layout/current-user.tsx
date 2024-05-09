import { Popover, Button } from "antd/lib"
import Avatar from "../custom-avatar"
import { useGetIdentity } from "@refinedev/core"
import type {User} from "@/graphql/schema.types"

const CurrentUser = () => {
  const {data: user} = useGetIdentity<User>() 

  return (
    <>
    <Popover
    placement="bottomRight"
    trigger={["click"]}
    overlayInnerStyle={{padding: 0}}
    overlayStyle={{zIndex: 999}}
    >
      <Avatar 
      name={user?.name}
      src={user?.avatarUrl}
      size="default"
      style={{cursor: "pointer"}}
      />
    </Popover>
    </>
  )
}

export default CurrentUser