import Drawer from '../nav'
import PropTypes from 'prop-types'
import {Outlet} from 'react-router-dom'

import React, {useState} from "react"

DashBoardLayout.proptype = {
	children : PropTypes.node
}

function DashBoardLayout(){
	const [openNav, setOpenNav] = useState(false)

	return (
		<div>
		<Drawer isOpenNav = {openNav} toggleOpenNav = {()=>setOpenNav(!openNav)} />
		<Outlet/>
		</div>
		)
}

export default DashBoardLayout;