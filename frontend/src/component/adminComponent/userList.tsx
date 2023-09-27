import React from 'react'
import TabelFrame from './tabelFrame';

function userListTable() {
  return (
    <TabelFrame/>
  )
}

export default userListTable;


// import React from 'react';

// function UserListTable() {
//   const userList = [
//     { id: 1, username: 'user1', email: 'user1@example.com' },
//     { id: 2, username: 'user2', email: 'user2@example.com' },
//     { id: 3, username: 'user3', email: 'user3@example.com' },
//     // Add more user data as needed
//   ];

//   return (
//     <div className='p-4'>
//       <h1 className='text-2xl font-semibold mb-4'>User List</h1>
//       <table className='min-w-full'>
//         <thead>
//           <tr>
//             <th className='text-left'>ID</th>
//             <th className='text-left'>Username</th>
//             <th className='text-left'>Email</th>
//           </tr>
//         </thead>
//         <tbody>
//           {userList.map((user) => (
//             <tr key={user.id}>
//               <td className='border px-4 py-2'>{user.id}</td>
//               <td className='border px-4 py-2'>{user.username}</td>
//               <td className='border px-4 py-2'>{user.email}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default UserListTable;
