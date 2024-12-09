import { useEffect } from "react";
export function useKey(key, action) {
  useEffect(
    function () {
      const callback = function (e) {
        if (e.code.toLowerCase() === key.toLowerCase()) action();
        console.log("Close");
      };
      document.addEventListener("keydown", callback);
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [action, key]
  );
}
