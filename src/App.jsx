import styled, { ThemeProvider } from 'styled-components';
import { darkTheme, lightTheme } from './utilities/Theme';
import GlobalStyles from './utilities/globalStyles';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import {
  Feed,
  History,
  Home,
  LikedVideos,
  Login,
  Playlists,
  Register,
  VideoDetail,
  WatchLater,
} from './pages';
import MockmanEs from 'mockman-js';
import { PrivateRoute } from './components/PrivateRoute';

const Container = styled.div`
  overflow: hidden;
`;

const BlankRoute = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              exact
              path='/'
              element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />}
            />

            <Route path='/feed' element={<Feed />} />
            <Route path='video/:videoId' element={<VideoDetail />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />

            <Route element={<PrivateRoute />}>
              <Route path='/playlists' element={<Playlists />} />
              <Route path='/likedVideos' element={<LikedVideos />} />
              <Route path='/history' element={<History />} />
              <Route path='/watchLater' element={<WatchLater />} />
            </Route>

            <Route
              path='*'
              element={
                <BlankRoute>
                  <p>There's nothing here! Try a valid link </p>
                </BlankRoute>
              }
            />

            <Route exact path='/mock' element={<MockmanEs />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
};

export default App;
