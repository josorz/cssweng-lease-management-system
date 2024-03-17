import React from "react";
import { useState, useEffect } from "react";

const Status = ({ message, color }) => {
  // TODO
  // Info : show red if overdue
  //        show yellow if pending
  //        show green if complete
  //        show dark red if cancelled

  return <div class="status">{message}</div>;
};

export default Status;
