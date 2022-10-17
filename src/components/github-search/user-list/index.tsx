const UserList = ({ users }: { users: any }) => {
 return (
  <div>
   {(users || []).map((user: any) => (
    <div className="result" key={user.id}>
     <span>{user.login}</span>
     {/* eslint-disable-next-line @next/next/no-img-element */}
     <img src={user.avatar_url} alt="avatar" />
     <a href={user.url} target="_blank" rel="noreferrer"></a>
    </div>
   ))}
  </div>
 );
};

export default UserList;
