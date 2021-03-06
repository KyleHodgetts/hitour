class Points extends React.Component {
  render () {
    return (
      <div>
        <GenericList getUrl={this.props.getUrl} />
        <form id="pointForm" onSubmit={this.showProgressBar}  className="col s12" encType="multipart/form-data" action={this.props.postUrl} method="post" >
          <div className="row">
            <div className="input-field col s12">
                <input id="point[name]" type="text" name="name" className="validate" required/>
                <label htmlFor="point[name]">Point Name</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
                <textarea name="description" id="point[description]" className="materialize-textarea" required></textarea>
                <label htmlFor="point[description]">Description</label>
            </div>
          </div>
          <div className="file-field input-field">
            <div className="btn">
              <span>File</span>
              <input type="file" name="file" id="point[file]" accept="image/*" required/>
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" placeholder="Upload your cover photo here" />
            </div>
          </div>
          <button className="btn right blue waves-effect waves-light"
                  type="submit" name="action">Submit
            <i className="material-icons right">send</i>
          </button>
        </form>
      </div>
    );
  }
  showProgressBar() {
    $('.progress-message').text('Creating Point and uploading image...');
    $('.progress-overlay').fadeIn(200);
  }
}

Points.displayName = 'Points';
Points.propTypes = {
  getUrl: React.PropTypes.string.isRequired,
  postUrl: React.PropTypes.string.isRequired
}
