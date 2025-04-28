import { Flex, Spin } from "antd";
import { useEffect, useRef, useState } from "react";

const Spinner: React.FC = () => {

  const [percent, setPercent] = useState(-50);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setPercent((v) => {
        const nextPercent = v + 5;
        return nextPercent > 150 ? -50 : nextPercent;
      });
    }, 100);
    return () => clearTimeout(timerRef.current!);
  }, [percent]);


  return (
    <Flex align="center" justify="center"  gap="middle">
      <Spin size="large" />
    </Flex>
  );
};

export default Spinner;
