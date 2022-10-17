import userListClasses from '@/components/github-search/user-list/user-list.module.css';
import CustomAvatar from '@/components/ui/custom-avatar';
import { Box, Link, Stack, Typography } from '@mui/material';

const UserList = ({ users }: { users: any }) => {
 return (
  <Box width={1} bgcolor={users.length ? '#cdcdcd' : ''} p={1.5}>
   {(users || []).map((user: any) => (
    <Box
     className={userListClasses.userListBox}
     mt={0.5}
     key={user.id}
     display="flex"
     alignItems="center"
     p={2}>
     <Stack spacing={2} direction="row" alignItems="center">
      <CustomAvatar src={user.avatar_url} alt="avatar" />
      <Typography variant="h6">{user.login}</Typography>
      <Link variant="body2" href={user.url} target="_blank" rel="noreferrer">
       View Profile
      </Link>
     </Stack>
    </Box>
   ))}
  </Box>
 );
};

export default UserList;
