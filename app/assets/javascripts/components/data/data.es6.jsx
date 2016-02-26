class Data extends React.Component {

  componentDidMount() {
    var postURL = this.props.postUrl;
    $('#audienceForm').on('submit',function(e){
      e.preventDefault();
      $.ajax({
        url: postURL,
        type: "POST",
        data: $(this).serialize(),
        success: function(data){
          Materialize.toast('Succesfully created new audience!', 3000, 'rounded');
          $('#audienceForm').trigger("reset");
        },
        error: function(err){
          console.log(err);
        }
      });
    });
  }

  render () {
    return (
      <div>
        <GenericList getUrl={this.props.getUrl} />
        <form id="dataForm">
          <label htmlFor="audience[name]">Data Name</label>
          <input type="text" name="audience[name]" />
          <button className="btn right blue waves-effect waves-light"
                  type="submit" name="action">Submit
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    );
  }
}

Data.displayName = "Data";
Data.propTypes = {
  getUrl: React.PropTypes.string.isRequired,
  postUrl: React.PropTypes.string.isRequired
}
