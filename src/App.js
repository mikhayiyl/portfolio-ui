import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import AnimatedRoutes from './components/AnimatedRoutes'

import Message from './components/Message';

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggle = () => setModalOpen(!modalOpen);

  return (

    <React.Fragment >
      <ToastContainer />
      {modalOpen && <Message setModalOpen={setModalOpen} />}
      <AnimatedRoutes toggle={toggle} />
    </React.Fragment>

  )
}

export default App