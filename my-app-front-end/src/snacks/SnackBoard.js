import { useEffect, useState } from "react";
import SnackItems from "./SnackItems";

const API = "http://localhost:9292/snacks";

function SnackBoard({ setSnackList, snackList }) {
  const displaySnacks = snackList.map((snack) => {
    return <SnackItems snack={snack} key={snack.id} />;
  });

  useEffect(() => {
    fetch(API)
      .then((resp) => resp.json())
      .then(setSnackList);
  }, []);

  return <div className="Snack-board">{displaySnacks}</div>;
}

export default SnackBoard;
