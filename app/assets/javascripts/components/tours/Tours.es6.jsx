class Tours extends React.Component {
  constructor (props) {
    super(props);
    this.state =  {
      audiences: this.props.audiences
    };
  }

  componentDidMount() {
    var postUrl = this.props.postUrl;
    $('#tourForm').on('submit',function(e){
      e.preventDefault();
      DataUtil.handlePostToServer(postUrl,$(this).serialize(),'Creating Tour. Please wait...',e);
      $('#tourForm')[0].reset();
    });
    $('select').material_select();
  }

  render () {
    return (
      <div>
        <GenericList getUrl={this.props.getUrl} />
        <div>
          <form id="tourForm">
            <div className="row">
              <div className="input-field col s12">
                <label htmlFor="tour[name]">New Tour Name</label>
                <input type="text" name="tour[name]" />
              </div>
            </div>
            <div className="row">
              <div className="input-field col s12">
                <select name="tour[audience_id]">
                  {this.state.audiences.map(function(audience) {
                    return (
                      <option value={audience[1]} key={audience[1]}>{audience[0]}</option>
                    );
                  }, this)}
                </select>
                <label>Tour Audience</label>
              </div>
            </div>
            <button className="btn right blue waves-effect waves-light"
                    type="submit" name="action">Submit
              <i className="material-icons right">send</i>
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Tours.displayName = 'Tours';
Tours.propTypes = {
  getUrl: React.PropTypes.string.isRequired,
  postUrl: React.PropTypes.string.isRequired,
  audiences: React.PropTypes.array
}
