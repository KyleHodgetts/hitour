class SingleQuiz extends React.Component{
  constructor (props) {
    super(props);
    this.state =  {
      quiz: [],
      questions: [],
      pollInterval: this.props.pollInterval || 2000
    };
  }

  componentDidMount() {
    DataUtil.handleCustomLoadDataFromServer.bind(this,this.props.getUrl,function(data){
      this.setState({
        quiz: data,
        questions: data["questions"]
      });
    }.bind(this));
    this.interval = setInterval(
      DataUtil.handleCustomLoadDataFromServer.bind(this,this.props.getUrl,function(data){
        this.setState({
          quiz: data,
          questions: data["questions"]
        });
      }.bind(this)),
      this.state.pollInterval
    );
    var postUrl = this.props.postQuestionUrl;
    $('#questionForm').on('submit', function(e){
      e.preventDefault();
      DataUtil.handlePostToServer(postUrl,$(this).serialize(),'Creating Question. Please wait...',e);
      $('#questionForm').trigger("reset");
    });
  }

  componentDidUpdate(prevProps, prevState) {
    var check = JSON.stringify(prevState) === JSON.stringify(this.state);
    if(!check || this.state.question == []){
      $('.collapsible').collapsible();
      var answerUrl = this.props.postAnswerUrl;
      $('#answerForm').unbind('submit').on('submit',function(e){
        e.preventDefault();
        DataUtil.handlePostToServer(answerUrl,$(this).serialize(),'Adding Answer. Please wait...',e);
        $('#answerForm').trigger("reset");
      });
    }
  }

  componentWillUnmount() {
    this.interval && clearInterval(this.interval);
    this.interval = false;
  }

  render () {
    var _this = this;
    return (
      <div>
        {this.state.quiz.name &&
          <GenericEdit
              value={this.state.quiz.name}
              postUrl={this.props.postQuizUrl}
              attributeName="quiz[name]"
          />
        }
        <ul className="collapsible" data-collapsible="accordion">
          {this.state.questions.map(function(question, i) {
            if(question.description.length > 25 && $(document).width() <= 350){
              question.description = question.description.substring(0,25)+"...";
            }
            return (
              <li key={question.id} >
                <div className="collapsible-header">
                  {question.description}
                  <a href="" className="secondary-content"
                               onClick={DataUtil.handleDeleteDataFromServer.bind(this, question.delete_url,"Are you sure you want to delete this question?")}>
                    <i className=" blue-text material-icons">delete_forever</i>
                  </a>
                  {question.show_url &&
                    <a id={item.id} href={question.show_url} className="secondary-content">
                      <i className=" blue-text material-icons">launch</i>
                    </a>
                  }
                </div>
                <div className="collapsible-body collection">
                  <div className="collection-item">
                    <table className="centered striped">
                      <thead>
                        <tr>
                          <th data-field="id">Correctly Answered</th>
                          <th data-field="name">Incorrectly Answered</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{question.correctly_answered}</td>
                          <td>{question.wrongly_answered}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  {question.answers.map(function(answer, index) {
                    return (<Answer key={answer.id} answer={answer} />);
                  })}
                  <form className="collection-item" id="answerForm">
                    <input type="hidden" name="answer[question_id]" value={question.id} />
                    <label htmlFor="answer[value]">Answer</label>
                    <input type="text" name="answer[value]" />
                      <div className="input-field col s12">
                        <p>
                          <input type="radio" id="answer[correct]" name="answer[is_correct]" value={"true"} defaultChecked = {0 == 0}/>
                          <label htmlFor="answer[correct]">Wrong</label>
                        </p>
                        <p>
                          <input type="radio" id="answer[wrong]" name="answer[is_correct]" value={"false"} />
                          <label htmlFor="answer[wrong]">Correct</label>
                        </p>
                      </div>
                    <button className="btn right blue waves-effect waves-light"
                            type="submit" name="action">Submit
                      <i className="material-icons right">send</i>
                    </button>
                  </form>
                </div>
              </li>
            );
          }, this)}
        </ul>
        {this.state.quiz &&
          <form id="questionForm">
            <input type="hidden" name="question[quiz_id]" value={this.state.quiz.id} />
            <label htmlFor="question[description]">Question</label>
            <input type="text" name="question[description]" id="question[description]" />
            <button className="btn right blue waves-effect waves-light"
                    type="submit" name="action">Submit
              <i className="material-icons right">send</i>
            </button>
          </form>
        }
      </div>
    )
  }
}

SingleQuiz.displayName = "Single Quiz";
SingleQuiz.propTypes = {
  getUrl: React.PropTypes.string.isRequired,
  postQuizUrl: React.PropTypes.string.isRequired,
  postQuestionUrl: React.PropTypes.string.isRequired,
  postAnswerUrl: React.PropTypes.string.isRequired,
  pollInterval: React.PropTypes.number
};
