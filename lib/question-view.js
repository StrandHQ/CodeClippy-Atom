'use babel';
/** @jsx etch.dom */

import etch from 'etch';
import AnswerView from './answer-view.js'

export default class QuestionView {
  constructor(props) {
    this.props = props;
    this.showThread = false;
    this.showComments = false;
    this.showAnswers = false;
    this.toggleThread = this.toggleThread.bind(this);
    this.toggleComments = this.toggleComments.bind(this);
    this.toggleAnswers = this.toggleAnswers.bind(this);
    etch.initialize(this);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    etch.destroy(this);
    this.element.remove();
  }

  update() {}

  getElement() {
    return this.element;
  }

  // Toggle whether entire question thread should be displayed
  toggleThread() {
    const currentState = this.showThread;
    this.showThread = !currentState;
    etch.update(this);
  }

  // Toggle whether question comments should be displayed
  toggleComments() {
    const currentState = this.showComments;
    this.showComments = !currentState;
    etch.update(this);
  }

  // Toggle whether question answers should be displayed
  toggleAnswers() {
    const currentState = this.showAnswers;
    this.showAnswers = !currentState;
    etch.update(this);
  }

  render() {
    const questionComments = this.props.question.comments == null ? (
      null
    ) : (
      this.props.question.comments.map((comment) => {
        return (
          <div class='comment'>
            <p>{comment.text} - <b>{comment.user.display_name}</b></p>
          </div>
        )
      })
    )

    const questionCommentGroup = this.props.question.comments == null ? (
      <br/>
    ) : (
      <div class='ui two column grid'>
        <div class='two wide column'/>
        <div class='fourteen wide column comments-column'>
          <a class='toggle' onclick={this.toggleComments}>
              Comments ({this.props.question.comments.length}) <span class={this.showComments ? 'icon icon-chevron-down' : 'icon icon-chevron-left'}/>
          </a>
          <div class={this.showComments ? "question-comments show" : "question-comments hide"}>
            {questionComments.reverse()}
          </div>
        </div>
      </div>
    )

    const questionAnswers = this.props.question.answers == null ? (
      null
    ) : (
      this.props.question.answers.map((answer) => <AnswerView answer={answer}/>)
    )

    const questionAnswerGroup = this.props.question.answers == null ? (
      <br/>
    ) : (
      <div>
        <div class='ui divider'/>
        <div class='question-answers-header'>
          <a class='toggle' onclick={this.toggleAnswers}>
            Answers ({this.props.question.answers.length}) <span class={this.showAnswers ? 'icon icon-chevron-down' : 'icon icon-chevron-left'}/>
          </a>
          <br/>
          <div class={this.showAnswers ? 'ui show' : 'ui hide'}>
            {questionAnswers}
          </div>
        </div>
      </div>
    )

    return (
      <div class='ui fluid raised card'>
        <div class='content'>
          <div class='ui two column grid'>
            <div class='column'>
              <h3>{this.props.question.title}</h3>
            </div>
            <div class='column'>
            <div class='ui top right attached label'>
              <span class={this.props.question.score > -1 ? "icon icon-thumbsup" : "icon icon-thumbsdown"}></span>
              <div class='score'>{this.props.question.score}</div>
            </div>
            </div>
          </div>
        </div>
        <div class='content'>
          <div class={this.showThread ? 'question-body-full' : 'question-body-preview'}>
            <div innerHTML={this.props.question.body}></div>
            {questionCommentGroup}
            {questionAnswerGroup}
          </div>
        </div>
        <div class='question-expand meta'>
          <a onclick={this.toggleThread}>{this.showThread ? 'Collapse' : 'Expand'}</a>
        </div>
      </div>
    )
  }
}
