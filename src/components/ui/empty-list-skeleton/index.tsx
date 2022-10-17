// Packages
import { Box, Skeleton } from '@mui/material';

const EmptyListSkeleton = () => {
 /**
  * @Render
  */
 return (
  <Box width={1}>
   <Skeleton height={80} />
   <Skeleton animation="wave" height={100} />
   <Skeleton animation="wave" height={120} />
   <Skeleton animation="wave" height={140} />
   <Skeleton animation={false} height={160} />
  </Box>
 );
};

export default EmptyListSkeleton;
