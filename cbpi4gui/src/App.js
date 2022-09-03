import { Container } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Badge from "@material-ui/core/Badge";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import NotificationsIcon from "@material-ui/icons/Notifications";
import React, {useRef, useLayoutEffect, useState} from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import About from "./components/about";
import { configapi } from "./components/data/configapi";
import Upload from "./components/upload";
import CBPiSystem from "./components/system";
import {Dashboard2 , FixDashboard} from "./components/dashboard/Dashboard";
import Hardware from "./components/hardware";
import ActorForm from "./components/hardware/ActorForm";
import KettleForm from "./components/hardware/KettleForm";
import FermenterForm from "./components/hardware/FermenterForm";
import SensorForm from "./components/hardware/SensorForm";
import Plugins from "./components/plugins";
import MashProfile from "./components/mashprofile";
import FermenterProfile from "./components/fermenterprofile";
import Settings from "./components/settings";
import Menu from "./components/util/Menu";
import PrivateRoute from "./components/util/PrivateRoute";
import logo from "./images/cbpi_no_border.png";
import StepForm from "./components/mashprofile/StepForm";
import FermenterStepForm from "./components/fermenterprofile/FermenterStepForm";
import Recipes from "./components/recipes";
import FermenterRecipes from "./components/fermenterrecipes";
import RecipeEditor from "./components/recipes/RecipeEditor";
import FermenterRecipeEditor from "./components/fermenterrecipes/FermenterRecipeEditor";
import { Charting } from "./components/charting";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,

    height: "100vh",
//    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(4),
    position: "absolute",
//	top: "64px",
	bottom: 0,
	overflowY: "auto",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  dashoard: {
    data: theme.mixins.toolbar,
  },
  snack: {
    position: "absolute",
    bottom: 10,
    right: 30,
    "& > * + *": {
      marginTop: theme.spacing(1),
    },
  },
}));

const CraftBeerPiApp = () => {
  const classes = useStyles();
  const navBarRef = useRef();
  const [appBarHeight, setAppBarHeight] = useState(64);
  const [open, setOpen] = useState(false);
  const [brewery,setBrewery] = useState("CraftBeerPi 4.0");
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  configapi.getone('BREWERY_NAME', (data) => {
    if (data){
      setBrewery(data);
       }
      });

  useLayoutEffect(() => {
    const updateNavBarHeight = () => {
      if (!navBarRef.current)
        return;
      const newHeight = navBarRef.current.clientHeight;
//	  console.log("Navbar height = " + newHeight);
      setAppBarHeight(newHeight);
    };
    window.addEventListener("resize", updateNavBarHeight);
    updateNavBarHeight();
    return () => window.removeEventListener("resize", updateNavBarHeight);
  }, []);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route
            path="/"
            render={() => (
                <PrivateRoute path="/">
                  <AppBar ref={navBarRef}  position="absolute" className={classes.appBar}>
                    <Toolbar className={classes.toolbar}>
                      <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} className={classes.menuButton}>
                        <MenuIcon />
                      </IconButton>
                      <div className={classes.title} style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                        <img width={30} src={logo} style={{ marginRight: 10 }} alt="CraftbeerPi Logo - Hops with a tap on the right side"/>
                        <Typography component="h1" variant="h4" color="inherit" noWrap>
                          {brewery}
                        </Typography>
                      </div>
                      <IconButton color="inherit">
                        <Badge badgeContent={0} color="secondary">
                          <NotificationsIcon />
                        </Badge>
                      </IconButton>
                    </Toolbar>
                  </AppBar>
                  <Drawer open={open} onClose={() => setOpen(false)}>
                    <Menu onClose={() => setOpen(false)} />
                  </Drawer>

            <main className={classes.content}>
              <div className={classes.appBarSpacer} />

                    <Container maxWidth={false} className={classes.container} style={{ top: appBarHeight }}>
                      <Route exact path="/" render={() => (<Dashboard2 />)}/>

                      <Route exact path="/fixdash/:dashboardid" render={() => (<FixDashboard />)}/>

                      <Container maxWidth="lg">
                        <Route path="/about" render={() => (
                            <About />
                        )}/>
                        <Route exact path="/actor" render={() => (
                            <ActorForm />
                        )}/>
                        <Route exact path="/actor/:id" render={() => (
                            <ActorForm />
                        )}/>
                        <Route exact path="/charting" render={() => (
                            <Charting />
                        )}/>
                        <Route exact path="/fermenter" render={() => (
                            <FermenterForm />
                        )}/>
                        <Route exact path="/fermenter/:id" render={() => (
                            <FermenterForm />
                        )}/>
                        <Route exact path="/fermenterprofile" render={() => (
                            <FermenterProfile />
                        )}/>
                        <Route exact path="/fermenterprofile/:fermenterid" render={() => (
                            <FermenterProfile />
                        )}/>
                        <Route exact path="/fermenterrecipes" render={() => (
                            <FermenterRecipes />
                        )}/>
                        <Route exact path="/fermenterrecipe/:id" render={() => (
                            <FermenterRecipeEditor />
                        )}/>
                        <Route exact path="/fermenterstep" render={() => (
                            <FermenterStepForm />
                        )}/>
                        <Route exact path="/fermenterstep/:fermenterid" render={() => (
                            <FermenterStepForm />
                        )}/>
                        <Route exact path="/fermenterstep/:id/:fermenterid" render={() => (
                            <FermenterStepForm />
                        )}/>
                        <Route path="/hardware" render={() => (
                            <Hardware />
                        )}/>
                        <Route exact path="/kettle" render={() => (
                            <KettleForm />
                        )}/>
                        <Route exact path="/kettle/:id" render={() => (
                            <KettleForm />
                        )}/>
                        <Route exact path="/mashprofile" render={() => (
                            <MashProfile />
                        )}/>
                        <Route path="/plugins" render={() => (
                            <Plugins />
                        )}/>
                        <Route exact path="/recipes" render={() => (
                            <Recipes />
                        )}/>
                        <Route exact path="/recipe/:id" render={() => (
                            <RecipeEditor />
                        )}/>
                        <Route exact path="/sensor" render={() => (
                            <SensorForm />
                        )}/>
                        <Route exact path="/sensor/:id" render={() => (
                            <SensorForm />
                        )}/>
                        <Route exact path="/settings" render={() => (
                            <Settings />
                        )}/>
                        <Route exact path="/step" render={() => (
                            <StepForm />
                        )}/>
                        <Route exact path="/step/:id" render={() => (
                            <StepForm />
                        )}/>
                        <Route path="/system" render={() => (
                            <CBPiSystem />
                        )}/>
                        <Route path="/upload" render={() => (
                            <Upload />
                        )}/>
                      </Container>
                    </Container>
                  </main>
                </PrivateRoute>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default CraftBeerPiApp;

/*

*/
