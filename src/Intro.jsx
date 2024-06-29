import { Suspense, cloneElement, useEffect, useState } from "react";

function Ready({ setReady }) {
  useEffect(() => () => void setReady(true), []);
  return null;
}

export default function Intro({ children }) {
  const [clicked, setClicked] = useState(false);
  const [ready, setReady] = useState(false);
  return (
    <>
      <Suspense fallback={<Ready setReady={setReady} />}>
        {cloneElement(children, { ready: clicked && ready })}
      </Suspense>
      <div className={`fullscreen bg ${ready ? "ready" : "notready"} ${clicked && "clicked"}`}>
        <div className="stack">
          <button className="p-4 border border-red-50 rounded-none" onClick={() => setClicked(true)} style={{ color: "white" }}>
            {!ready ? "loading" : "click to continue"}
          </button>
        </div>
      </div>
    </>
  );
}
