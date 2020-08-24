declare module 'react-websocket' {
  import React from 'react';

  interface WebSocketProps {
    url: string;
    onMessage: (data: any) => void;
    onOpen?: () => void;
    onClose?: (code: number, reason: string) => void;
    onError?: (error: any) => void;
    debug?: boolean;
    reconnect?: boolean;
    protocol?: string;
    reconnectIntervalInMilliSeconds?: number;
  }

  class WebSocket extends React.Component<WebSocketProps> { }

  export = WebSocket;
}
