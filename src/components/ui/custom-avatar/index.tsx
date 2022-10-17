// Packages
import { Avatar, AvatarProps } from '@mui/material';

const CustomAvatar = ({ children, ...props }: AvatarProps) => {
 /**
  * @Render
  */
 return <Avatar {...props}>{children}</Avatar>;
};

export default CustomAvatar;
