import Image from 'next/image';

const UserList = ({ users }: { users: any }) => {
 const imgLoader = (src: any) => {
  return src;
 };
 return (
  <div>
   {(users || []).map((user: any) => (
    <div className="result" key={user.id}>
     <span>{user.login}</span>
     <Image
      width={20}
      height={20}
      loader={() => imgLoader(user.avatar_url)}
      src={user.avatar_url}
      alt="avatar"
     />
     <a href={user.url} target="_blank" rel="noreferrer"></a>
    </div>
   ))}
  </div>
 );
};

export default UserList;
