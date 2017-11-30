'use babel';
/** @jsx etch.dom */

import etch from 'etch';
import moment from 'moment';

export default class AnswerView {
  constructor(props) {
    this.props = props;
    this.showComments = false;
    this.toggleComments = this.toggleComments.bind(this);
    etch.initialize(this);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
    etch.destroy(this);
  }

  update() {}

  getElement() {
    return this.element;
  }

  // Toggle whether answer comments should be displayed
  toggleComments() {
    const currentState = this.showComments;
    this.showComments = !currentState;
    etch.update(this);
  }

  render() {
    const checkmark = this.props.answer.is_accepted === true ? (<span class='icon icon-check'/>) : (null);

    const answerComments = this.props.answer.comments == null ? (
      null
    ) : (
      this.props.answer.comments.map((comment) => {
        return (
          <div class='comment'>
            <p>{comment.text} - <b>{comment.user.display_name}</b></p>
          </div>
        )
      })
    );

    const answerCommentGroup = this.props.answer.comments == null ? (
      <br/>
    ) : (
      <div class='ui two column grid'>
        <div class='one wide column'/>
        <div class='fifteen wide column comments-column'>
          <a class='toggle' onclick={this.toggleComments}>
            Comments ({this.props.answer.comments.length}) <span class={this.showComments ? 'icon icon-chevron-down' : 'icon icon-chevron-left'}/>
          </a>
          <div class={this.showComments ? 'show' : 'hide'}>
            {answerComments.reverse()}
          </div>
        </div>
      </div>
    )

    const creator = this.props.answer.owner_user ? `By ${this.props.answer.owner_user.display_name} on` : 'On';

    return (
      <div class='ui two column grid'>
        <div class='one wide column'>
          <div class='ui top right attached label'>
            <span class={this.props.answer.score > -1 ? 'icon icon-thumbsup thumbsup' : 'icon icon-thumbsdown thumbsup'}></span>
            <div class='score'>{this.props.answer.score}</div>
          </div>
        </div>
        <div class='fifteen wide column answer-column'>
          <div class='answer'>
            <div innerHTML={this.props.answer.body}/>
            <div class='answer-metadata'>
              <p>{creator} {moment(this.props.answer.creation_date).format('MMM Do YY')}</p>
            </div>
            {answerCommentGroup}
          </div>
        </div>
      </div>
    )
  }
}
