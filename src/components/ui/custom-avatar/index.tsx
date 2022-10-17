import { Avatar, AvatarProps } from '@mui/material';

const CustomAvatar = ({ children, ...props }: AvatarProps) => {
 return <Avatar {...props}>{children}</Avatar>;
};

export default CustomAvatar;
