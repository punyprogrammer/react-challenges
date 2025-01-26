import * as React from "react";
function Battery({ level, charging, chargingTime, dischargingTime }) {
  return (
    <>
      <div>{`level:${level}`}</div>
      <div>{`charging:${charging}`}</div>
      <div>{`chargingTime:${chargingTime}`}</div>
      <div>{`dischargingTime:${dischargingTime}`}</div>
    </>
  );
}
function useBattery() {
  const [state, setState] = React.useState({
    supported: true,
    loading: false,
    level: null,
    charging: null,
    chargingTime: null,
    dischargingTime: null,
  });
  React.useEffect(() => {
    // if navigator.getBattery is not supported return
    if (!navigator.getBattery) {
      setState((s) => ({
        ...s,
        supported: false,
        loading: false,
      }));
      return;
    }

    let battery = null;
    // update battery status
    function updateBatteryStatus() {
      setState((prevState) => ({
        ...prevState,
        supported: true,
        loading: false,
        level: battery.level,
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
      }));
    }
    // navigator.getBattery returns a promise
    async function initBattery() {
      try {
        battery = await navigator.getBattery();

        battery.addEventListener("levelchange", updateBatteryStatus);
        battery.addEventListener("chargingchange", updateBatteryStatus);
        battery.addEventListener("chargingtimechange", updateBatteryStatus);
        battery.addEventListener("dischargingtimechange", updateBatteryStatus);
      } catch (error) {
        console.error("Error accessing battery information:", error);
        setState((prevState) => ({
          ...prevState,
          supported: false,
          loading: false,
        }));
      }
    }
    initBattery();

    // remove event listener
    return () => {
      if (battery) {
        battery.removeEventListener("levelchange", updateBatteryStatus);
        battery.removeEventListener("chargingchange", updateBatteryStatus);
        battery.removeEventListener("chargingtimechange", updateBatteryStatus);
        battery.removeEventListener(
          "dischargingtimechange",
          updateBatteryStatus
        );
      }
    };
  }, []);
  return state;
}

export default function App() {
  const { loading, level, charging, chargingTime, dischargingTime } =
    useBattery();
  return (
    <>
      <div className="wrapper">
        <h1>useBattery</h1>
        {!loading ? (
          <Battery
            level={level * 100}
            charging={charging}
            chargingTime={chargingTime}
            dischargingTime={dischargingTime}
          />
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </>
  );
}
