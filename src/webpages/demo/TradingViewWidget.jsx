import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

const TradingViewWidget = ({ symbol = "NASDAQ:AAPL" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous widget if any
    container.innerHTML = "";

    // Create script element for TradingView widget
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      calendar: false,
      support_host: "https://www.tradingview.com",
    });

    // Append script to the widget container
    container.querySelector(
      ".tradingview-widget-container__widget"
    )?.appendChild(script);

    // Cleanup on unmount
    return () => {
      container.innerHTML = "";
    };
  }, [symbol]);

  return (
    <div
      className="tradingview-widget-container"
      ref={containerRef}
      style={{
        height: "400px",
        maxWidth: "95%",
        margin: "2rem auto",
        padding: "1rem",
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "100%", width: "100%" }}
      ></div>
    </div>
  );
};

TradingViewWidget.propTypes = {
  symbol: PropTypes.string,
};

export default TradingViewWidget;
