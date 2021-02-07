import { useMachine } from '@xstate/react';
import { appMachine, MachineContext } from './state';
import ContactForm from './components/Contactform';

function App() {
  const [currentMachine, sendToMachine] = useMachine(appMachine);
  return (
    <MachineContext.Provider value={[currentMachine, sendToMachine]}>
      <div className="App">
        <ContactForm />
      </div>
    </MachineContext.Provider>
  );
}

export default App;
