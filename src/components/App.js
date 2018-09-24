import React from 'react';
import Grid from '@material-ui/core/Grid';
import TopBar from './TopBar';
import CalendarView from './Calendar/CalendarView';
import SidebarView from './Sidebar/SidebarView';

function App() {
  return (
    <div>
      <TopBar />
      <Grid container>
        <Grid item md={9} sm={12}>
          <CalendarView />
        </Grid>

        <Grid item md={3} sm={12}>
          <SidebarView />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
