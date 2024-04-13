import React from 'react'
import { BrowserRouter } from 'react-router-dom';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import GlobalStyles from './theme/globalStyles';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

import { UserContextProvider } from "./modules/users/context";
import { ResturantContextProvider} from "./modules/admin/resturants/context";
import { ReservationContextProvider} from "./modules/reservations/context";

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import routes, {renderRoutes} from './routes'
import Router from "./routes"
import ThemeCofig from './theme'

function App() {
  return (
    <ThemeCofig>
      <BrowserRouter>
        <ThemePrimaryColor>
          <GlobalStyles/>
              <LocalizationProvider dateAdapter={AdapterDayjs}>

          <UserContextProvider>
          <ResturantContextProvider>
          <ReservationContextProvider>
          <BaseOptionChartStyle/>
          <Router/>
          </ReservationContextProvider>
          </ResturantContextProvider>
          </UserContextProvider>
              </LocalizationProvider>


        </ThemePrimaryColor>
      </BrowserRouter>
    </ThemeCofig>
    );
}

export default App;
