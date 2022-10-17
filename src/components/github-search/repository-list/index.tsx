// Styles
import repositoryListClasses from '@/components/github-search/repository-list/repository-list.module.css';

// Types
import { IRepoResults } from '@/services/github-search/types';

// Packges
import ShareIcon from '@mui/icons-material/Share';
import StarIcon from '@mui/icons-material/Star';
import { Box, Chip, Stack, Typography } from '@mui/material';

const RepositoryList = ({ repositories }: { repositories: IRepoResults[] }) => {
 /**
  * @Render
  */
 return (
  <Box width={1} bgcolor={repositories.length ? '#cdcdcd' : ''} p={1.5}>
   {(repositories || []).map((repository: IRepoResults) => (
    <Box
     className={repositoryListClasses.repositoryListBox}
     mt={0.5}
     key={repository.id}
     display="flex"
     alignItems="center"
     p={2}>
     <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      width={1}>
      <Typography variant="h6">{repository.full_name}</Typography>
      <Stack spacing={2} display="flex" direction="row">
       <Typography variant="body1">
        <Chip label={repository.language} color="primary" variant="filled" />
       </Typography>
       <Box display="flex" alignItems="center" fontSize="1rem">
        <StarIcon color="warning" /> {repository.stargazers_count || 0}
       </Box>
       <Box display="flex" alignItems="center" fontSize="1rem">
        <ShareIcon /> {repository.forks_count || 0}
       </Box>
      </Stack>
     </Stack>
    </Box>
   ))}
  </Box>
 );
};

export default RepositoryList;
