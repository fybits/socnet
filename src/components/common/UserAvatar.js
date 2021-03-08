import { Avatar, IconButton } from '@material-ui/core'
import React from 'react'

const UserAvatar = ({ size="small", userId, onClick }) => {
    return (
        <IconButton size={size} onClick={onClick}>
            <Avatar size={size} src={`https://i.pravatar.cc/150?u=${userId}`} />
        </IconButton>
    )
}

export default UserAvatar
