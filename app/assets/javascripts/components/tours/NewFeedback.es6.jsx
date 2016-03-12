class NewFeedback extends React.Component{
  componentDidMount () {
    this.starListener();
    var postUrl = this.props.postUrl;
    $('#feedbackForm').on('submit',function(e){
      e.preventDefault();
      // Show Progress
      $('.progress-message').text('Uploading Feedback. Please wait...');
      $('.progress-overlay').fadeIn(200);
      $.ajax({
        url: '/feedback',
        type: "POST",
        data: $(this).serialize(),
        success: function(data) {
          $('.progress-overlay').fadeOut();
          $('.star').eq(0).trigger('click');
          $('#feedbackForm').trigger('reset');
          Materialize.toast(data, 3000, 'rounded');
        },
        error: function(data) {
          console.log(data);
          $('.progress-overlay').fadeOut();
          Materialize.toast(data, 3000, 'rounded');
        }
      });
    });
  }

  render () {
    return (
      <div>
        <form id="feedbackForm" className="col s12" style={{border:'1px solid black'}}>
          <h3>Add Feedback</h3>
          <input type="hidden" name="feedback[tour_id]" value={this.props.tourId}></input>
          <div className="row" style={{marginBottom:'0'}}>
            <div className="col s12 start-container">
              <label>Tour Rating:</label><br/>
              <p className="star-rating"><span className="star material-icons">star_rate</span></p>
              <p className="star-rating"><span className="star material-icons">star_rate</span></p>
              <p className="star-rating"><span className="star material-icons">star_rate</span></p>
              <p className="star-rating"><span className="star material-icons">star_rate</span></p>
              <p className="star-rating"><span className="star material-icons">star_rate</span></p>
              <input type="hidden" name="feedback[rating]" className="validate"/>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <textarea id="feedback[comment]" className="validate materialize-textarea" name="feedback[comment]"></textarea>
              <label htmlFor="feedback[comment]" className="active">Comment</label>
            </div>
          </div>
          <button type="submit" className="waves-effect waves-light btn blue right">
            <i className="material-icons left">cloud</i>Save Feedback
          </button>
        </form>
      </div>
    );
  }

  starListener () {
    $('.star').on('click',function(e){
      $('.star').removeClass('star-selected');
      var currentIndex = $('.star').index(this);
      for(var i = 0;i <= currentIndex;i++){
        var star = $('.star').eq(i);
        star.addClass('star-selected');
      }
      //Set the Hidden input
      $(this).parent().parent().find('input').val(currentIndex+1);
    });
    $('.star').mouseenter(function(){
      $('.star').removeClass('star-hover');
      var currentIndex = $('.star').index(this);
      for(var i = 0;i <= currentIndex;i++){
        var star = $('.star').eq(i);
        star.addClass('star-hover');
      }
    }).mouseleave(function(){
      $('.star').removeClass('star-hover');
    });
    //Click first star
    $('.star').eq(0).trigger('click');
  }
}

NewFeedback.displayName = "NewFeedback";
NewFeedback.propTypes = {
  tourId: React.PropTypes.number.isRequired,
  postUrl: React.PropTypes.string.isRequired
}