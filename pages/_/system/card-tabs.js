import * as React from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";

import Group from "~/components/system/Group";
import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from "~/components/system/CodeBlock";

const TAB_GROUP_TWO = [
  { value: "1", label: "Capricorn" },
  { value: "2", label: "Aquarius" },
];

const TAB_GROUP_FOUR = [
  { value: "1", label: "Capricorn" },
  { value: "2", label: "Aquarius" },
  { value: "3", label: "Pisces" },
  { value: "4", label: "Aries" },
];

export default class SystemPageCardTabs extends React.Component {
  state = {
    exampleOne: "1",
    exampleTwo: "4",
  };

  _handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <SystemPage
        title="SDS: Card Tabs"
        description="..."
        url="https://slate.host/_/system/card-tabs"
      >
        <System.H1>
          Card Tabs <ViewSourceLink file="system/card-tabs.js" />
        </System.H1>
        <br />
        <br />
        <System.P1>
          The CardTabGroup component is used to allow the users to switch between views.
        </System.P1>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P1>Import React and the CardTabGroup Component.</System.P1>
        <br />
        <br />
        <CodeBlock>
          {`import * as React from "react";
import { CardTabGroup } from "slate-react-system";`}
        </CodeBlock>
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P1>Define the tab group values and labels.</System.P1>
        <br />
        <CodeBlock>
          {`const TAB_GROUP_TWO = [
  { value: "1", label: "Capricorn" },
  { value: "2", label: "Aquarius" },
];

const TAB_GROUP_FOUR = [
  { value: "1", label: "Capricorn" },
  { value: "2", label: "Aquarius" },
  { value: "3", label: "Pisces" },
  { value: "4", label: "Aries" },
];`}
        </CodeBlock>
        <br />
        <System.P1>Declare the CardTabGroup component.</System.P1>
        <br />
        <CodeBlock>
          {`class ExampleOne extends React.Component {
  state = { exampleOne: "1" };

  _handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <CardTabGroup
        name="exampleOne"
        options={TAB_GROUP_TWO}
        value={this.state.exampleOne}
        onChange={this._handleChange}
      />
    );
  }
}

class ExampleTwo extends React.Component {
  state = { exampleTwo: "4" };

  _handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <CardTabGroup
        name="exampleTwo"
        options={TAB_GROUP_FOUR}
        value={this.state.exampleTwo}
        onChange={this._handleChange}
      />
    );
  }
}`}
        </CodeBlock>
        <br />
        <br />
        <System.H2>Output</System.H2>
        <hr />
        <br />
        <System.CardTabGroup
          name="exampleOne"
          options={TAB_GROUP_TWO}
          value={this.state.exampleOne}
          onChange={this._handleChange}
        />
        <br />
        <br />
        <System.CardTabGroup
          name="exampleTwo"
          options={TAB_GROUP_FOUR}
          value={this.state.exampleTwo}
          onChange={this._handleChange}
        />
        <br />
        <br />
        <br />
        <System.H2>Accepted React Properties</System.H2>
        <hr />
        <br />
        <Group title="Card Tabs">
          <System.Table
            data={{
              columns: [
                { key: "a", name: "Name", width: "128px" },
                { key: "b", name: "Type", width: "88px", type: "OBJECT_TYPE" },
                { key: "c", name: "Default", width: "88px" },
                { key: "d", name: "Description", width: "100%" },
              ],
              rows: [
                {
                  id: 1,
                  a: <span style={{ fontFamily: Constants.font.semiBold }}>onChange</span>,
                  b: "function",
                  c: "null",
                  d: "Function called upon an onChange event",
                },
                {
                  id: 2,
                  a: <span style={{ fontFamily: Constants.font.semiBold }}>value</span>,
                  b: "boolean",
                  c: "false",
                  d:
                    "The value that is currently selected. Can be used to assign default values as well",
                },
                {
                  id: 3,
                  a: <span style={{ fontFamily: Constants.font.semiBold }}>options</span>,
                  b: "Array",
                  c: "[]",
                  d: "An array of options, each of which has a value and a label",
                },
                {
                  id: 4,
                  a: "name",
                  b: "string",
                  c: "null",
                  d: "Input name",
                },
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}
