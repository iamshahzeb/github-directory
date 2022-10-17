import classes from '@/components/header/header.module.css';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Stack, Typography } from '@mui/material';

const Header = () => {
 /**
  * @Render
  */
 return (
  <Box
   display="flex"
   alignItems="center"
   justifyContent="space-between"
   height={65}
   bgcolor="#24292f"
   mb={3}
   px={2}>
   <Stack spacing={2} direction="row" alignItems="center">
    <GitHubIcon className={classes.headerIcon} />
    <Typography className={classes.headerTypo} variant="h6">
     Github Search
    </Typography>
   </Stack>
   <Box>Dropdown</Box>
  </Box>
 );
};

export default Header;
