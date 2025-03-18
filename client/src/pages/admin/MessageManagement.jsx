import React from 'react'
import AdminLayout from '../../components/layout/AdminLayout'


const columns = [
  {
    field : 'id',
    headerName : 'ID',
    headerClassName : 'table-header',
    width : 200
  },
  {
    field : 'attachments',
    headerName : 'Message',
    headerClassName : 'table-header',
    width : 200,
    renderCell: (params) => (
    <Avatar 
    alt={params.row.name} 
    src={params.row.avatar}/>
    )
  },
  {
    field : "content",
    headerName : "content",
    headerClassName : 'table-header',
    width : 400,
  },
  {
    field : 'sender',
    headerName : 'sent By',
    headerClassName : 'table-header',
    width : 200,
    renderCell: (params) => (
      <Stack>
    <Avatar 
    alt={params.row.sender.name} 
    src={params.row.sender.avatar}/>
        <span>{params.row.sender.name}</span>
        </Stack>
    )
  },
  {
    field : "chat",
    headerName : "chat",
    headerClassName : 'table-header',
    width : 220,
  },
  {
    field : "groupsChat",
    headerName : "groups Chat",
    headerClassName : 'table-header',
    width : 100,
  },
  {
    field : "createdAt",
    headerName : "Time",
    headerClassName : 'table-header',
    width : 250,
  },
]

const MessageManagement = () => {
  return (
    <AdminLayout>

        <div>MessageManagement</div>
    </AdminLayout>
  )
}

export default MessageManagement