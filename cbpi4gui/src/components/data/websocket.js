import axios from "axios";
class CBPiWebSocket {

    
    constructor(onMessageCallback, alert) {
      this.ws = undefined;
      this.connect_count = 0;
      this.alert = alert;
      this.onMessageCallback = onMessageCallback
    }
    
    connection_lost(e) {
        console.log(this.alert);
        this.onMessageCallback({topic: 'connection/lost'});      
        this.onMessageCallback({topic: 'notifiaction', id: '1', title: 'Connection to Server', message: 'Cbpi server seems to be down', type: 'error', action: []});
          setTimeout(() => {
            this.open();
          }, 5000);
    }
  
    open() {
      if (process.env.NODE_ENV === "development") {
        console.log("DEV MODE ON", "WebSocket URL", process.env.REACT_APP_WEBSOCKET_URL);
        this.ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL, []);
        
      } else {
        this.ws = new WebSocket("ws://" + document.location.host + "/ws", []);
        
      }
  
      this.ws.onclose = this.connection_lost.bind(this);
      this.ws.onmessage = this.on_message.bind(this);
      this.ws.onopen = this.on_open.bind(this);
  
    }
  
    on_open() {
      console.log("WS OPEN")
      this.onMessageCallback(this.alert)
      axios.get("/actor/ws_update")
      this.onMessageCallback({topic: 'notifiaction', id: '2', title: 'Connection to Server', message: 'Established connection to Cbpi server', type: 'success', action: []});
    }
  
    on_message(e) {
      let data = JSON.parse(e.data);
      this.onMessageCallback(data, this.alert)
    }
    
    connect() {
      this.open();
    }
  }

  export default CBPiWebSocket