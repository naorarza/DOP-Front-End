import { useState } from "react";
import { ConfigProvider, theme, Button, Card } from "antd";

function AntdSwitch({isDarkMode,setIsDarkMode}) {
 const { defaultAlgorithm, darkAlgorithm } = theme;

 const handleClick = () => {
  setIsDarkMode((previousValue) => !previousValue);
 };

 return (
  <ConfigProvider
   theme={{
    algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
   }}>
   <Card style={{ width: "max-content" }}>
    <Button onClick={handleClick}>
     שנה את הרקע למצב {isDarkMode ? "יום" : "לילה"}
    </Button>
   </Card>
  </ConfigProvider>
 );
}

export default AntdSwitch;