import { Avatar, Box, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { dashboardData } from '../../components/constants/sampleData';
import AdminLayout from '../../components/layout/AdminLayout';
import AvatarCard from "../../components/shared/AvatarCard";
import RenderAttachment from "../../components/shared/RenderAttachment";
import Table from '../../components/shared/Table';
import { fileFormat, transforImage } from "../../lib/features";


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
    <AvatarCard  
    avatar={params.row.avatar}/>
    )
  },
  {
    field : 'attachment',
    headerName : 'Attachment',
    headerClassName : 'table-header',
    width : 200,
    renderCell: (params) => {
      const {attachments} = params.row;

      return attachments?.length > 0 ? attachments.map((i)=>{
        const url = i.url;
        const file = fileFormat(url);
        return <Box>
          <a href={url}
          download
          target='_blank'
          style={{
            color : 'black'
          }}
          >
            {RenderAttachment(file, url)}
          </a>
        </Box>
      }) : "No Attachment"

    // return <AvatarCard 
    // alt={params.row.name} 
    // avatar={params.row.avatar}/>
    }
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
    renderCell :  (params) => (
      <Stack>
    <Avatar 
    alt={params.row.creator.name} 
    src={params.row.creator.avatar}/>
        <span>{params.row.creator.name}</span>
    </Stack>
    )
  },
]
const ChatManagement = () => {

  const [rows, setRows] = useState([]);

  useEffect(()=>{
    setRows(dashboardData.map((i) => ({
      ...i, 
      id : i._id, 
      avatar : i.avatar.map((i) => transforImage(i, 50)),
      members : i.members.map((i) => transforImage(i.avatar, 50)),
      creator : {
        name : i.creator.name,
        avatar : transforImage(i.creator.avatar, 50)
      }
    })))
  })

  return (
    <AdminLayout>
        <Table 
        heading={'All Chats'} 
        columns={columns} 
        rows={rows}
        rowHeight={200} 
        />
    </AdminLayout>
  )
}



export default ChatManagement