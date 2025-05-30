import React, { useState, useEffect } from 'react'
import AdminLayout from '../../components/layout/AdminLayout'
import Table from '../../components/shared/Table'
import { Avatar } from '@mui/material';
import {dashboardData} from '../../components/constants/sampleData';
import {transforImage} from "../../lib/features"


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
    width : 200,
  },
  {
    field : "username",
    headerName : "Username",
    headerClassName : 'table-header',
    width : 200,
  },
  {
    field : "friends",
    headerName : "friends",
    headerClassName : 'table-header',
    width : 150,
  },
  {
    field : "groups",
    headerName : "groups",
    headerClassName : 'table-header',
    width : 200,
  },
]
const UserManagement = () => {

  const [rows, setRows] = useState([]);

  useEffect(()=>{
    setRows(dashboardData.map((i) => ({
      ...i, 
      id : i._id, 
      avatar : transforImage(i.avatar, 50)
    })))
  })

  return (
    <AdminLayout>
        <Table 
        heading={'All Users'} 
        columns={columns} 
        rows={rows} 
        />
    </AdminLayout>
  )
}

export default UserManagement