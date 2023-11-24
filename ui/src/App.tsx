import SignIn from './components/singin';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './libs/router/router';

function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}

export default App;
