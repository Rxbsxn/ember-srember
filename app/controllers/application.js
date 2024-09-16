// app/controllers/application.js
import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ApplicationController extends Controller {
  @tracked reactValue = 0;
  @tracked mojaLiczba = 0;
  @action
  handleReactEvent(text, value) {
    console.log(`Received event from React: ${text} ${value}`);
    this.reactValue = value;
  }

  reactRef = null;

  @action
  setReactRef(ref) {
    this.reactRef = ref;
  }

  @action
  increment() {
    console.log('XXX')
    this.mojaLiczba = this.mojaLiczba + 1;
  }

  @action
  callReactMethod(value) {
    if (this.reactRef && this.reactRef.current) {
      this.reactRef.current.reactMethod(value);
    } else {
      console.error('React component instance not available');
    }
  }
}
