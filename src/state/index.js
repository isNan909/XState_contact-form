import { createContext } from 'react';
import { assign, Machine } from 'xstate';

export const MachineContext = createContext();

const sendMessage = async (_ctx, event) => {
  const { Name, Address, Phone, About } = event;
  const req = {
    records: [
      {
        fields: { Name, Address, Phone, About },
      },
    ],
  };
  const res = await fetch(
    'https://api.airtable.com/v0/apprqknKF0qTzRuGH/Message',
    {
      method: 'POST',
      headers: new Headers({
        // API key should be confidential
        Authorization: 'Bearer keyWR29lNpjiJJ***',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(req),
    }
  );
  return res;
};

export const appMachine = Machine({
  id: 'app',
  initial: 'idle',
  context: {
    fields: '',
    error: undefined,
  },
  states: {
    idle: {},
    sending: {
      invoke: {
        id: 'sendMessage',
        src: sendMessage,
        onDone: {
          target: 'success',
          actions: assign({ fields: (_context, event) => event.data }),
        },
        onError: {
          target: 'failed',
          actions: assign({ error: (_context, event) => event.data }),
        },
      },
    },
    success: {},
    failed: {},
  },
  on: {
    SEND: {
      target: 'sending'
    },
  },
});
