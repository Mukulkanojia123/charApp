import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import { Avatar, Stack } from '@mui/material'
import Table from '../../components/shared/Table'
import { dashboardData } from '../../components/constants/sampleData'
import {transforImage} from '../../lib/features'
import moment from 'moment'


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
      <Stack direction={'row'} spacing={'1rem'} alignItem={'center'}>
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

  const [rows, setRows] = useState()
  useEffect(()=>{
    setRows(dashboardData.messages.map((i)=>({
      ...i,
      id : i._id,
      sender : {
        name : i.sender.name,
        avatar :transforImage(i.sender.avatar,50),
      },
      createdAt : moment(i.createdAt).format('MMMM Do YYYY, h:mm:ss a'),
    })))
  },[])

  return (
    <AdminLayout>

        <Table heading={'All Messages'} columns={columns} rows={rows} />
    </AdminLayout>
  )
}

export default MessageManagement