'use babel';

import { CompositeDisposable } from 'atom';
import SearchView from './search-view.js'
import $ from 'jquery';

function resizeStarted() {
  $(document).on('mousemove', resizePanel);
  return $(document).on('mouseup', resizeStopped);
}

function resizePanel(e) {
  $('.atom-plugin').width(window.innerWidth - e.clientX);
}

function resizeStopped() {
  $(document).off('mousemove', resizePanel);
  $(document).off('mouseup', resizeStopped);
}

export default {

  searchView: null,
  subscriptions: null,
  rightPanel: null,

  activate(state) {
    this.searchView = new SearchView(state.searchViewState);
    this.rightPanel = atom.workspace.addRightPanel({
      item: this.searchView,
      visible: false
    });

    // Watch for resizing the panel
    $('.resize-handle').on('mousedown', resizeStarted);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'code-clippy-plugin:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.rightPanel.destroy();
    this.subscriptions.dispose();
    this.searchView.destroy();
  },

  serialize() {
    return {
      atomPluginViewState: this.searchView.serialize()
    };
  },

  toggle() {
    return (
      this.rightPanel.isVisible() ?
      this.rightPanel.hide() :
      this.rightPanel.show()
    );
  }
};
