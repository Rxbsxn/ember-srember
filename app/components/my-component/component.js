// app/components/remote-react-component.js
import Component from '@glimmer/component';
import { action } from '@ember/object';
import loadScript from '../../utils/load';

export default class MyComponent extends Component {
  @action
  async mountReactComponent(element) {
    try {
      // Load React and ReactDOM if not already loaded
      if (!window.React || !window.ReactDOM) {
        await Promise.all([
          loadScript('https://unpkg.com/react@17/umd/react.production.min.js'),
          loadScript(
            'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
          ),
        ]);
      }

      // Load the remote React library
      await loadScript(
        'https://ember-srember-react.netlify.app/my-react-app.umd.js',
      );

      // Access the exported component
      const MyReactComponent = window.MyReactApp;

      if (!MyReactComponent) {
        throw new Error('React component not found in MyReactApp');
      }

      this.reactRef = window.React.createRef();

      // Render the React component
      const props = {
        ...this.args.props,
        ref: this.reactRef,
      };
      window.ReactDOM.render(
        window.React.createElement(MyReactComponent, props),
        element,
      );
    } catch (error) {
      console.error('Failed to load or render React component:', error);
    }

    if (this.args.onReactRef) {
      this.args.onReactRef(this.reactRef);
    }
  }

  @action
  unmountReactComponent(element) {
    if (window.ReactDOM) {
      window.ReactDOM.unmountComponentAtNode(element);
    }
  }
}
