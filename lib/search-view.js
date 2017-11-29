'use babel';
/** @jsx etch.dom */

import etch from 'etch'
import request from 'request';
import QuestionView from './question-view.js'

export default class SearchView {
  constructor(props) {
    this.query = null;
    this.results = [];
    this.handleInputChange = this.handleInputChange.bind(this);
    etch.initialize(this);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
    etch.destory(this);
  }

  update () {}

  getElement() {
    return this.element;
  }

  search(query) {
    return new Promise((resolve, reject) => {
      url = `https://staging.solutionloft.com/api/search/?query=${query}`;
      console.log('Search url: ', url)
      request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
          resolve(JSON.parse(body))
        } else {
          console.log(error);
          reject({
            reason: 'An error occurred :('
          })
        }
      })
    })
  }

  handleInputChange(evt) {
    this.query = evt.target.value;
    this.results = null;
    etch.update(this);

    this.search(this.query).then((response) => {
      this.results = response.results;
      console.log(this.results);
      etch.update(this);
    }).catch((error) => {
      console.log('Error: ', error);
    })
  }

  render() {
    const results = this.results == null ? (
        <span class='loading loading-spinner-large'></span>
    ) : (
      (this.results.length === 0) ? (
        <div class='ui fluid raised card'>
          <div class='content'>
            <h3>No results</h3>
          </div>
        </div>
      ) : (
        this.results.map((result) => <QuestionView question={result}/>)
      )
    );

    return (
      <div class='atom-plugin native-key-bindings'>
        <div class='resize-handle'/>
        <h1>CodeClippy: Write code faster</h1>
        <input class='input-search native-key-bindings' type='search'
               onchange={this.handleInputChange}
               value={this.query}/>
        <div class='ui divider'/>
        <div class='ui cards'>
          {results}
        </div>
      </div>
    )
  }

}
