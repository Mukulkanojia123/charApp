import React, { useState, useEffect } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { Avatar } from '@mui/material';
import {dashboardData} from '../../components/constants/sampleData';
import {transforImage} from "../../lib/features"
import AvatarCard from "../../components/shared/AvatarCard"


const columns = [
  {
    field : 'id',
    headerName : 'ID',
    headerClassName : 'table-header',
    width : 200
  },
  {
    field : 'avatar',
    headerName : 'Avatar',
    headerClassName : 'table-header',
    width : 150,
    renderCell: (params) => (
    <Avatar 
    alt={params.row.name} 
    src={params.row.avatar}/>
    )
  },
  {
    field : "name",
    headerName : "Name",
    headerClassName : 'table-header',
    width : 300,
  },
  {
    field : "totalMembers",
    headerName : "total Members",
    headerClassName : 'table-header',
    width : 120,
  },
  {
    field : "members",
    headerName : "Menbers",
    headerClassName : 'table-header',
    width : 400,
    renderCell : (params)=><AvatarCard max={100} avatar={params.row.members}/>
  },
  {
    field : "create",
    headerName : "created By",
    headerClassName : 'table-header',
    width : 250,
    renderCel :  (params) => (
      <Stack>
    <Avatar 
    alt={params.row.sender.name} 
    src={params.row.sender.avatar}/>
        <span>{params.row.sender.name}</span>
        </Stack>
    )
  },
]
const ChatManagement = () => {

  const [rows, setRows] = useState([]);

  useEffect(()=>{
    // setRows(dashboardData.map((i) => ({
    //   ...i, 
    //   id : i._id, 
    //   avatar : transforImage(i.avatar, 50)
    // })))
  })

  return (
    <AdminLayout>
        <Table 
        heading={'All Chats'} 
        columns={columns} 
        rows={rows} 
        />
    </AdminLayout>
  )
}



export default ChatManagement