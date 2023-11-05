import logo from './logo.svg';
import './App.css';
import Gallery from './Components/Gallery';
import { useEffect, useState } from 'react';
import {
  RingLoader
} from 'react-spinners';
import Header from './Components/Header';

function App() {
  const [Loading, SetLoading] = useState(true);

  useEffect(() => {
    SetLoading(true)

    setTimeout(() => {
      SetLoading(false)
    }
      , 3000)
  }, [])
  return (
    <>
      {
        Loading ? (
          <div className="loader">
            <RingLoader

              color={ '#023047' }
              loading={ true }
              size={ 100 }
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) :
          <div>
            <Header></Header>
            <Gallery></Gallery>
          </div>
      }
    </>
  );
}

export default App;
