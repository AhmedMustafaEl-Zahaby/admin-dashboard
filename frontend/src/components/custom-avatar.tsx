import { getNameInitials } from "@/utilities"
import { Avatar as AntDAvatar } from "antd"
import { AvatarProps } from "antd/lib"
type Props = AvatarProps & {
    name?: string
}
const Avatar = ({name , style , ...rest}: Props) => {
  return (
    <AntDAvatar
    alt = {name}
    size = "small"
    style={{
        backgroundColor: "#87d068",
        display: "flex",
        alignItems: "center",
        border: "none",
        ...style
    }}
    {...rest}
    >
        {getNameInitials(name ||"")}
    </AntDAvatar>
  )
}

export default Avatar