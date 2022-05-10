import * as React from "react";
import * as System from "~/components/system";
import * as Constants from "~/common/constants";
import * as Events from "~/common/custom-events";

import Group from "~/components/system/Group";
import SystemPage from "~/components/system/SystemPage";
import ViewSourceLink from "~/components/system/ViewSourceLink";
import CodeBlock from "~/components/system/CodeBlock";

export default class SystemPageNotifications extends React.Component {
  state = {
    count: 0,
  };

  _handleCreate = (detail) => {
    Events.dispatchCustomEvent({ name: "create-notification", detail: detail });
    this.setState({ count: this.state.count + 1 });
  };

  _handleDelete = () => {
    Events.dispatchCustomEvent({ name: "delete-notification", detail: {} });
  };

  render() {
    return (
      <SystemPage
        title="SDS: Notifications"
        description="..."
        url="https://slate.host/_/system/notifications"
      >
        <System.H1>
          Notifications <ViewSourceLink file="system/notification.js" />
        </System.H1>
        <br />
        <br />
        <System.P1>
          The Notification component is used to alert a user of new information.
        </System.P1>
        <br />
        <br />
        <br />
        <System.H2>Imports</System.H2>
        <hr />
        <br />
        <System.P1>
          Import React and the Notification Component, as well as the dispatchCustomEvent function.
        </System.P1>
        <br />
        <CodeBlock>
          {`import * as React from "react";
import { GlobalNotification, dispatchCustomEvent } from "slate-react-system";`}
        </CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Usage</System.H2>
        <hr />
        <br />
        <System.P1>
          Declare the component at the root level of your document (e.g. in index.js or App.js) so
          it is accessible throughout and will not get buried in the DOM tree.
        </System.P1>
        <br />
        <System.P1>
          Use <System.CodeText>style</System.CodeText> to specify placement of the fixed positioning
          notification list. Default is bottom right.
        </System.P1>
        <br />
        <CodeBlock>
          {`class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <GlobalNotification style={{ bottom: 0, right: 0 }} />
        {this.props.children}
      </React.Fragment>
    );
  }
}`}
        </CodeBlock>
        <System.GlobalNotification style={{ bottom: 0, right: 0 }} />
        <br />
        <br />
        <br />
        <System.H2>Notification</System.H2>
        <hr />
        <br />
        <System.ButtonSecondary
          full
          onClick={() =>
            this._handleCreate({
              id: this.state.count,
              description: "This is a regular notification",
            })
          }
        >
          Click for notification
        </System.ButtonSecondary>
        <br />
        <System.ButtonSecondary
          full
          onClick={() =>
            this._handleCreate({
              id: this.state.count,
              description: "This is a dark notification",
              dark: true,
            })
          }
        >
          Click for dark style notification
        </System.ButtonSecondary>
        <br />
        <System.ButtonPrimary full onClick={this._handleDelete}>
          Click to clear notifications
        </System.ButtonPrimary>
        <br />
        <System.P1>
          A notification will only appear once you trigger it by creating a custom event with the
          title <System.CodeText>"create-notification"</System.CodeText>. It can be removed with a
          custom event entitled <System.CodeText>"delete-notification"</System.CodeText>.
        </System.P1>
        <br />
        <System.P1>
          Multiple stacked notifications can be created using a single Notification component.{" "}
          <strong>Each co-existing notification must have a unique id.</strong>
        </System.P1>
        <br />
        <CodeBlock>
          {`class ExampleOne extends React.Component {
  state = {
    count: 0,
  };

  _handleCreate = (detail) => {
    dispatchCustomEvent({ name: "create-notification", detail: detail });
    this.setState({ count: this.state.count + 1 });
  };

  _handleDelete = () => {
    dispatchCustomEvent({ name: "delete-notification", detail: {} });
  };

  render() {
    return (
      <React.Fragment>
        <ButtonSecondary
          full
          onClick={() =>
            this._handleCreate({
              id: this.state.count,
              description: "This is notification number " + this.state.count,
            })
          }
        >
          Click for notification
        </ButtonSecondary>
        <br />
        <ButtonSecondary
          full
          onClick={() =>
            this._handleCreate({
              id: this.state.count,
              description: "This is a dark notification",
              dark: true,
            })
          }
        >
          Click for dark style notification
        </ButtonSecondary>

        <ButtonPrimary full onClick={this._handleDelete}>
          Click to clear notifications
        </ButtonPrimary>
      </React.Fragment>
    );
  }
}`}
        </CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Notification with timeout</System.H2>
        <hr />
        <br />
        <System.ButtonSecondary
          full
          onClick={() =>
            this._handleCreate({
              id: this.state.count,
              description: "This disappears after 5 seconds",
              timeout: 5000,
            })
          }
        >
          Click for disappearing notification
        </System.ButtonSecondary>
        <br />
        <System.ButtonPrimary full onClick={this._handleDelete}>
          Click to clear notifications
        </System.ButtonPrimary>
        <br />
        <System.P1>
          You can declare the Notification component with a{" "}
          <System.CodeText>timeout</System.CodeText> (in milliseconds) after which it will
          automatically disappear.
        </System.P1>
        <br />
        <CodeBlock>
          {`class ExampleTwo extends React.Component {
  state = {
    count: 0,
  };

  _handleCreate = (detail) => {
    dispatchCustomEvent({ name: "create-notification", detail: detail });
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <React.Fragment>
        <ButtonSecondary
          full
          onClick={() =>
            this._handleCreate({
              id: this.state.count,
              description: "This disappears after 5 seconds",
              timeout: 5000,
            })
          }
        >
          Click for disappearing notification
        </ButtonSecondary>

        <ButtonPrimary full onClick={this._handleDelete}>
          Click to clear notifications
        </ButtonPrimary>
      </React.Fragment>
    );
  }
}`}
        </CodeBlock>
        <br />
        <br />
        <br />
        <System.H2>Notification with status</System.H2>
        <hr />
        <br />
        <System.ButtonSecondary
          full
          onClick={() =>
            this._handleCreate({
              id: this.state.count,
              description: "This is an info notification",
              status: "INFO",
            })
          }
        >
          Click for info style notification
        </System.ButtonSecondary>
        <br />
        <System.ButtonSecondary
          full
          onClick={() =>
            this._handleCreate({
              id: this.state.count,
              description: "This is a success notification",
              status: "SUCCESS",
            })
          }
        >
          Click for success style notification
        </System.ButtonSecondary>
        <br />
        <System.ButtonSecondary
          full
          onClick={() =>
            this._handleCreate({
              id: this.state.count,
              description: "This is a warning notification",
              status: "WARNING",
            })
          }
        >
          Click for warning style notification
        </System.ButtonSecondary>
        <br />
        <System.ButtonSecondary
          full
          onClick={() =>
            this._handleCreate({
              id: this.state.count,
              description: "This is an error notification",
              status: "ERROR",
            })
          }
        >
          Click for error style notification
        </System.ButtonSecondary>
        <br />
        <System.ButtonPrimary full onClick={this._handleDelete}>
          Click to clear notifications
        </System.ButtonPrimary>
        <br />
        <br />
        <System.P1>
          Declare the Notification component with a <System.CodeText>status</System.CodeText> to
          style it accordingly. This is overridden if <System.CodeText>dark</System.CodeText> is set
          to true.
        </System.P1>
        <br />
        <CodeBlock>
          {`class ExampleThree extends React.Component {
  state = {
    count: 0,
  };

  _handleCreate = (detail) => {
    dispatchCustomEvent({ name: "create-notification", detail: detail });
    this.setState({ count: this.state.count + 1 });
  };

  _handleDelete = () => {
    dispatchCustomEvent({ name: "delete-notification", detail: {} });
  };

  render() {
    return (
      <React.Fragment>
        <ButtonSecondary
          full
          onClick={() =>
            this._handleCreate({
              id: this.state.count,
              description: "This is an info notification",
              status: "INFO",
            })
          }
        >
          Click for info style notification
        </ButtonSecondary>

        <ButtonSecondary
          full
          onClick={() =>
            this._handleCreate({
              id: this.state.count,
              description: "This is a success notification",
              status: "SUCCESS",
            })
          }
        >
          Click for success style notification
        </ButtonSecondary>

        <ButtonSecondary
          full
          onClick={() =>
            this._handleCreate({
              id: this.state.count,
              description: "This is a warning notification",
              status: "WARNING",
            })
          }
        >
          Click for warning style notification
        </ButtonSecondary>

        <ButtonSecondary
          full
          onClick={() =>
            this._handleCreate({
              id: this.state.count,
              description: "This is an error notification",
              status: "ERROR",
            })
          }
        >
          Click for error style notification
        </ButtonSecondary>

        <ButtonPrimary full onClick={this._handleDelete}>
          Click to clear notifications
        </ButtonPrimary>
      </React.Fragment>
    );
  }
}`}
        </CodeBlock>
        <br />
        <br />
        <System.H2>Accepted React Properties</System.H2>
        <hr />
        <br />
        <Group title="Notifications">
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
                  a: "style",
                  b: "Object",
                  c: "{ bottom: 0, right: 0 }",
                  d: "Style object used to style the notification list positioning on the page",
                },
              ],
            }}
          />
        </Group>
        <br />
        <br />
        <br />
        <System.H2>
          Accepted <i>Create</i> Notification Properties
        </System.H2>
        <hr />
        <br />
        <System.P1>
          Note that these properties are passed through a custom event rather than as react
          properties.
        </System.P1>
        <br />
        <Group title="Notifications">
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
                  a: <span style={{ fontFamily: Constants.font.semiBold }}>id</span>,
                  b: ["string", "number"],
                  c: "null",
                  d: "Notification id, must be unique for simultaneously existing notifications",
                },
                {
                  id: 2,
                  a: "status",
                  b: "string",
                  c: "null",
                  d:
                    "Status which determines the styling and color of the notification. Use INFO, SUCCESS, WARNING, or ERROR",
                },
                {
                  id: 3,
                  a: "timeout",
                  b: "int",
                  c: "null",
                  d: "Number of milliseconds before the notification automatically disappears",
                },
                {
                  id: 4,
                  a: "label",
                  b: "string",
                  c: "null",
                  d: "Label text",
                },
                {
                  id: 5,
                  a: "description",
                  b: "string",
                  c: "null",
                  d: "Description text",
                },
              ],
            }}
          />
        </Group>
      </SystemPage>
    );
  }
}
