import { useState } from "react";
import { Collapse } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";
import { transport, food, streaming, fashion, purchase } from "./data";
import SliderNumeric from "./components/SliderNumeric";
import PanelHeader from "./components/PanelHeader";
import { getTypeProps } from './config'
import "./App.css";
const { Panel } = Collapse;

type Key = string;

type BarChartDataItem = {
  key: Key;
  checked?: boolean;
  [key: string]: any;
};
type BarChartData = BarChartDataItem[];

const App = () => {
  const [chartsData, setChartsData] = useState([] as BarChartData);
  const [fixedAmount, setFixedAmount] = useState(0 as number);

  const insert = (prevState: BarChartData, data: object) => [
    ...prevState,
    data,
  ];

  const update = (
    prevState: BarChartData,
    { key, ...data }: BarChartDataItem
  ): BarChartData => {
    // @ts-ignore
    return prevState.map((item) =>
      item.key === key ? { ...item, ...data } : item
    );
  };

  const alreadyExists = (prevState: BarChartData, key: Key): boolean =>
    !!prevState?.find((item) => item.key === key);

  const onChange = ({ key, ...values }: BarChartDataItem) => {
    setChartsData((prevState: BarChartData): any[] => {
      return alreadyExists(prevState, key)
        ? update(prevState, { key, ...values })
        : insert(prevState, { key, ...values });
    });
  };

  const checkedChartsData = chartsData.filter((chardData) => chardData.checked);

  const generalProps = {
    onChangeCheck: onChange,
    onChangeAmount: onChange,
    fixedAmount: fixedAmount,
    onSetFixedAmount: setFixedAmount,
  }

  return (
    <div className="app">
      <div className="chart-division">
        <BarChart
          width={Math.min(1200, window.screen.width)}
          height={Math.max(400, checkedChartsData.length * 40)}
          data={checkedChartsData}
          layout="vertical"
          margin={{
            top: 20,
            right: 100,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="key" />
          <Tooltip />
          <Bar dataKey="value" stackId="a" fill="#1890ff">
            <LabelList dataKey="label" position="right" />
          </Bar>
        </BarChart>
      </div>
      <div className="form-division">
        <div className="form-container">
          <Collapse defaultActiveKey={[]}>
            <Panel
              header={<PanelHeader title="Transport" />}
              key="1"
              forceRender
            >
              {Object.entries(transport).map(([key, value]) => {
                return (
                  <SliderNumeric
                    {...getTypeProps(key)}
                    {...generalProps}
                    name={key}
                    amountPerStep={value * 1000}
                  />
                );
              })}
            </Panel>
            <Panel header={<PanelHeader title="Food" />} key="2" forceRender>
              {Object.entries(food).map(([key, value]) => {
                return (
                  <SliderNumeric
                    {...getTypeProps(key)}
                    {...generalProps}
                    name={key}
                    amountPerStep={value / 1000}
                  />
                );
              })}
            </Panel>
            <Panel
              header={<PanelHeader title="Streaming" />}
              key="3"
              forceRender
            >
              {Object.entries(streaming).map(([key, value]) => {
                return (
                  <SliderNumeric
                    {...getTypeProps(key)}
                    {...generalProps}
                    name={key}
                    amountPerStep={value * 60 * 60}
                  />
                );
              })}
            </Panel>
            <Panel header={<PanelHeader title="Fashion" />} key="4" forceRender>
              {Object.entries(fashion).map(([key, value]) => {
                return (
                  <SliderNumeric
                    {...getTypeProps(key)}
                    {...generalProps}
                    name={key}
                    amountPerStep={value}
                  />
                );
              })}
            </Panel>
            <Panel
              header={<PanelHeader title="Purchase" />}
              key="5"
              forceRender
            >
              {Object.entries(purchase).map(([key, value]) => {
                return (
                  <SliderNumeric
                    {...getTypeProps(key)}
                    {...generalProps}
                    name={key}
                    amountPerStep={value}
                  />
                );
              })}
            </Panel>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default App;
