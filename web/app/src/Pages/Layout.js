import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import ListAltRoundedIcon from '@mui/icons-material/ListAltRounded';
import PlaylistAddRoundedIcon from '@mui/icons-material/PlaylistAddRounded';
// import Logo from '../images/logo.png'
import EventBusyRoundedIcon from '@mui/icons-material/EventBusyRounded';
import PlaylistAddCheckRoundedIcon from '@mui/icons-material/PlaylistAddCheckRounded';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from "@mui/icons-material/Mail";
import ArticleIcon from "@mui/icons-material/Article";
import { ExpandLess, ExpandMore, Paragliding } from "@mui/icons-material";
import SmartConnect from "../Components/Url/SmartConnect";
import { sideMenu } from "../Constants/constant";
import { Collapse } from "@mui/material";
//import { farmerPo } from "../Constants/constant";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Layout() {

  const [openMenu, setOpenMenu] = React.useState(true);

  const theme = useTheme();

  const navigate = useNavigate();
  const sideBarData = [
    {
      text: "Create",
      icon: <MailIcon />,
      nav: "test/add",
    },
    {
      text: "List",
      icon: <ArticleIcon />,
      nav: "test/list",
    },
  ];
  const [open, setOpen] = React.useState(
    window.innerWidth < 500 ? false : true
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = (nav) => {
    console.log(nav);
    navigate(nav);
  };
  const handleClickMenu = () => {
    setOpenMenu(!openMenu)
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Fresh2Rely
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sideMenu.map((item, index) => (
            <>
              <ListItemButton onClick={handleClickMenu}>
                <ListItemIcon>
                  <ListAltRoundedIcon />
                </ListItemIcon>
                <ListItemText primary={item.text} />
                {openMenu ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={!openMenu} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {
                    item.options.map((item, index) => {
                      return (
                        <ListItemButton sx={{ pl: 4 }} onClick={() => navigate(item.link)} >
                          <ListItemIcon>
                            <PlaylistAddRoundedIcon />
                          </ListItemIcon>
                          <ListItemText primary={item.text} />
                        </ListItemButton>
                      )
                    })
                  }


                </List>
              </Collapse>
            </>
            // <ListItem
            //   key={item.text}
            //   disablePadding
            //   onClick={() => handleClick(item.nav)}
            // >
            //   <ListItemButton>
            //     {/* <ListItemIcon>{item.icon}</ListItemIcon> */}
            //     <ListItemText primary={item.text} />
            //   </ListItemButton>
            // </ListItem>
          ))}
        </List>
        <Divider />
        {/* <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? "<InboxIcon />" : "<MailIcon />"}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer >
      <Main open={open}>
        {/* <DrawerHeader /> */}
        <div className="route-container">
          <SmartConnect />
          <Outlet />
        </div>
      </Main>
    </Box >
  );
}
