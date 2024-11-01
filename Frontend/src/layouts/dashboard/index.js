// Chakra imports
import { Portal, Box, useDisclosure } from '@chakra-ui/react';
// Layout components
import Navbar from '../../components/navbar/NavbarAdmin.js';
import Sidebar from '../../components/sidebar/Sidebar.js';
import { SidebarContext } from '../../contexts/SidebarContext.js';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'
import routes from '../../routes.js';
import Admin from '../../pages/dashboard/demografia/index.jsx';
import Profile from '../../pages/dashboard/inicio/index.jsx';
import Health from '../../pages/dashboard/salud/index.jsx';
import Security from '../../pages/dashboard/seguridad/index.jsx';
import Violence from '../../pages/dashboard/violencia/index.jsx';
import Education from '../../pages/dashboard/educacion/index.jsx';
import Modelo from '../../pages/dashboard/modelo/index.jsx';

// Custom Chakra theme
export default function Dashboard(props) {
	const { ...rest } = props;
	// states and functions
	const [fixed] = useState(false);
	const [toggleSidebar, setToggleSidebar] = useState(false);
	// functions for changing the states from components
	const getRoute = () => {
		return window.location.pathname !== '/dashboard/full-screen-maps';
	};
	const getActiveRoute = (routes) => {
		let activeRoute = 'Default Brand Text';
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				let collapseActiveRoute = getActiveRoute(routes[i].items);
				if (collapseActiveRoute !== activeRoute) {
					return collapseActiveRoute;
				}
			} else if (routes[i].category) {
				let categoryActiveRoute = getActiveRoute(routes[i].items);
				if (categoryActiveRoute !== activeRoute) {
					return categoryActiveRoute;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					return routes[i].name;
				}
			}
		}
		return activeRoute;
	};
	const getActiveNavbar = (routes) => {
		let activeNavbar = false;
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				let collapseActiveNavbar = getActiveNavbar(routes[i].items);
				if (collapseActiveNavbar !== activeNavbar) {
					return collapseActiveNavbar;
				}
			} else if (routes[i].category) {
				let categoryActiveNavbar = getActiveNavbar(routes[i].items);
				if (categoryActiveNavbar !== activeNavbar) {
					return categoryActiveNavbar;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					return routes[i].secondary;
				}
			}
		}
		return activeNavbar;
	};
	const getActiveNavbarText = (routes) => {
		let activeNavbar = false;
		for (let i = 0; i < routes.length; i++) {
			if (routes[i].collapse) {
				let collapseActiveNavbar = getActiveNavbarText(routes[i].items);
				if (collapseActiveNavbar !== activeNavbar) {
					return collapseActiveNavbar;
				}
			} else if (routes[i].category) {
				let categoryActiveNavbar = getActiveNavbarText(routes[i].items);
				if (categoryActiveNavbar !== activeNavbar) {
					return categoryActiveNavbar;
				}
			} else {
				if (window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1) {
					return routes[i].messageNavbar;
				}
			}
		}
		return activeNavbar;
	};
	const getRoutes = (routes) => {
		return routes.map((prop, key) => {
			if (prop.layout === '/dashboard') {
				if (prop.component) {
					return (
						<Route
							key={key}
							path={`${prop.layout}${prop.path}`}
							element={<prop.component />}
						/>
					);
				} else {
					console.error(`Component for route "${prop.name}" is undefined.`);
				}
			}
			if (prop.collapse) {
				return getRoutes(prop.items);
			}
			if (prop.category) {
				return getRoutes(prop.items);
			}
			return null;
		});
	};

	document.documentElement.dir = 'ltr';
	const { onOpen } = useDisclosure();
	document.documentElement.dir = 'ltr';
	return (


		<Box>
			<Box>
				<SidebarContext.Provider
					value={{
						toggleSidebar,
						setToggleSidebar
					}}>
					<Sidebar routes={routes} display='none' {...rest} />
					<Box
						float='right'
						minHeight='100vh'
						height='100%'
						overflow='auto'
						position='relative'
						maxHeight='100%'
						w={{ base: '100%', xl: 'calc( 100% - 290px )' }}
						maxWidth={{ base: '100%', xl: 'calc( 100% - 290px )' }}
						transition='all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)'
						transitionDuration='.2s, .2s, .35s'
						transitionProperty='top, bottom, width'
						transitionTimingFunction='linear, linear, ease'>
						<Portal>
							<Box>
								<Navbar
									onOpen={onOpen}
									brandText={getActiveRoute(routes)}  // Ruta activa
									secondary={getActiveNavbar(routes)} // Estado de la barra de navegación
									message={getActiveNavbarText(routes)} // Texto asociado a la barra de navegación
									fixed={fixed}
									{...rest}
								/>
							</Box>
						</Portal>

						{getRoute() ? (
							<Box mx='auto' p={{ base: '20px', md: '30px' }} pe='20px' minH='100vh' pt='50px'>
								<Routes>
									{getRoutes(routes)}
									
									<Route path="/inicio" element={<Profile />} />
									<Route path="/demografia" element={<Admin />} />
									<Route path="/salud" element={<Health />} />
									<Route path="/educacion" element={<Education />} />
									<Route path="/seguridad" element={<Security />} />
									<Route path="/violencia" element={<Violence />} />
									<Route path="/modelo" element={<Modelo />} />
									
								</Routes>
							</Box>
						) : null}
					</Box>
				</SidebarContext.Provider>
			</Box>
		</Box>
	);
}