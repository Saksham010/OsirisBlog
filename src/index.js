import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from "react-cookie";
import { MantineProvider,Text,Button } from '@mantine/core';
import { ModalsProvider,ContextModalProps } from '@mantine/modals';
import { NotificationsProvider } from '@mantine/notifications';
const TestModal = ({ context, id, innerProps }) => (
  <>
    <Text size="sm">{innerProps.modalBody}</Text>
    <Button fullWidth mt="md" onClick={() => {context.closeModal(id); innerProps.redirect()}}>
      Ok
    </Button>
  </>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>

    <CookiesProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <ModalsProvider modals={{loginCheckModal: TestModal}}>
          <NotificationsProvider>
            <App />
          </NotificationsProvider>
        </ModalsProvider>
      </MantineProvider>
    </CookiesProvider>
    
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
