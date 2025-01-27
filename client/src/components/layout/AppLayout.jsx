import React from "react";
import Header from "./Header";
import Title from "../shared/Title";
import Grid from "@mui/material/Grid2";

const AppLayout = (WrappedComponent) => {
  return (props) => {
    return (
      <>
        
        <Title title="Chat App" />
        
        
        <Header />
        
       
        <Grid container height={"calc(100vh - 4rem)"}>
          
          <Grid
            item
            size={{
              sm: 4,
              md: 3,
            }}
            sx={{
              display: { xs: "none", sm: "block" },
            }}
            height={"100%"}
          >
            First
          </Grid>
          
        
          <Grid
            item
            size={{
              xs: 12,
              sm: 8,
              md: 5,
              lg: 6,
            }}
            height={"100%"}
            // bgcolor="primary.main"
          >
            <WrappedComponent {...props} />
          </Grid>
          
          
          <Grid
            item
            size={{
              md: 4,
              lg: 3,
            }}
            height={"100%"}
            sx={{
              display: { xs: "none", md: "block" },
              padding: "2rem",
              bgcolor: "rgba(0,0,0,0.85)",
            }}
          >
            Third
          </Grid>
        </Grid>
      </>
    );
  };
};

export default AppLayout;
