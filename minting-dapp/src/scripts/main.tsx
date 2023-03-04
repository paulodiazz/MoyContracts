import '../styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';

import ReactDOM from 'react-dom';
import Dapp from './react/Dapp';
import CollectionConfig from '../../../smart-contract/config/CollectionConfig';
import { ToastContainer } from 'react-toastify';
import Leftside from './react/LeftSide';
import RightSide from './react/RightSide';
import * as amplitude from '@amplitude/analytics-browser';

amplitude.init('05087ac83c74f3170378446966cd508d');
amplitude.track('User Visited', undefined
);



if (document.title === '') {
  document.title = CollectionConfig.tokenName;
}

document.addEventListener('DOMContentLoaded', async () => {
  ReactDOM.render(<>
    <ToastContainer
          position='top-left'
          autoClose={5000}
          closeOnClick={true}
          pauseOnHover={true}
          theme='light' />
  </>, document.getElementById('notifications'));

  ReactDOM.render(<>
    <Dapp />
  </>, document.getElementById('minting-dapp'));

  ReactDOM.render(<>
    <Leftside />
  </>, document.getElementById('left-side'));

  ReactDOM.render(<>
    <RightSide />
  </>, document.getElementById('right-side'));
});
