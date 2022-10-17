const RepositoryList = ({ repositories }: { repositories: any }) => {
 return (
  <div>
   {(repositories || []).map((repo: any) => (
    <div className="result" key={repo.id}>
     <span>{repo.full_name}</span>
    </div>
   ))}
  </div>
 );
};

export default RepositoryList;
