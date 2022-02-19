import axios from "axios";

export const save = (id, data, callback_susscess = () => {}, callback_failed = () => {}) => {
  console.log(data);
  axios
    .put("/fermenter/" + id, data)
    .then(function (response) {
      console.log(response);
      callback_susscess(response.data);
    })
    .catch(function (error) {
      console.log("ERROR", error)
      callback_failed();
    });
};

export const add = (data, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/fermenter/", data)
    .then(function (response) {
      console.log(response);
      callback_susscess(response.data);
    })
    .catch(function (error) {
      console.log("ERROR")
      callback_failed();
    });
};

export const remove = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .delete("/fermenter/"+ id)
    .then(function (response) {
      console.log(response);
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};


export const start = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/fermenter/"+ id + "/on")
    .then(function (response) {
      console.log(response);
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};


export const stop = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/fermenter/"+ id + "/off")
    .then(function (response) {
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};

export const toggle = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/fermenter/"+ id + "/toggle")
    .then(function (response) {
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};


export const target_temp = (id, temp, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/fermenter/"+ id + "/target_temp", {temp})
    .then(function (response) {
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};

export const getsteps = (id, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .get("/fermenter/"+ id + "/getsteps")
    .then(function (response) {
      callback_susscess(response.data);
    })
    .catch(function (error) {
      callback_failed();
    });
};


export const updatestep = (fermenterid, stepid, data, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .put("/fermenter/"+ fermenterid + "/" + stepid, data)
    .then(function (response) {
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};

export const addstep = (fermenterid, data, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/fermenter/"+ fermenterid +"/addstep", data)
    .then(function (response) {
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};

export const movestep = (fermenterid, stepid, direction, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .put("/fermenter/movestep", {fermenterid, stepid, direction})
    .then(function (response) {
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};

export const deletestep = (fermenterid, stepid, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .delete("/fermenter/"+ fermenterid + "/" + stepid)
    .then(function (response) {
      callback_susscess();
    })
    .catch(function (error) {
      callback_failed();
    });
};

export const clearsteps = (fermenterid, callback_susscess = () => {}, callback_failed = () => {}) => {
  axios
    .post("/fermenter/" + fermenterid + "/clearsteps")
    .then(function (response) {
      
    })
    .catch(function (error) {
      callback_failed();
    });
};


export const fermenterapi = {
  add,
  remove,
  toggle,
  target_temp,
  save,
  start,
  stop,
  getsteps,
  updatestep,
  addstep,
  movestep,
  deletestep,
  clearsteps
}