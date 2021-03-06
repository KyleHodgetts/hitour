class Editprofileform extends React.Component {
  componentDidMount() {
    var patchUrl = this.props.patchUrl;
    $('#updateForm').on('submit',function(e){
      e.preventDefault();
      DataUtil.handlePostToServer(patchUrl,$(this).serialize(),'Updating password. Please wait...',e);
      $('#updateForm').trigger('reset');
      document.getElementById('password').focus();
    });
  }

  render () {
    return (

      <div className="row">
     <h4>&nbsp;&nbsp;{(!(this.props.currentUser.activated)?'Please set your password to activate your account'
      :'Profile')}</h4>

        <form id="updateForm" className="col s12" method="post">
          <input type="hidden" name="_method" value="patch" />
          <div className="row">
            <div className="input-field col s12">
              <input name="user[email]" disabled value={this.props.currentUser.email}
                     id="email" type="email" className="validate" />
              <label htmlFor="email" className="active" data-error="wrong" data-success="right">
                Email
              </label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s6">
              <input name="user[password]" id="password" type="password"
                     className="validate" />
              <label data-error="Password must be at least 6 characters long"
                     htmlFor="password">New Password</label>
            </div>
            <div className="input-field col s6">
              <input name="user[cpassword]" pattern=".{6,}"
                     required id="confirm-password" type="password"
                     className="validate" />
              <label data-error="Password must be at least 6 characters long"
                     htmlFor="confirm-password">Confirm Password</label>
            </div>
          </div>
          <div className="row">
            <button className="btn waves-effect waves-light right blue"
                                type="submit" name="action">
              Save
              <i className="material-icons right">send</i>
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Editprofileform.displayName = 'Editprofileform'
Editprofileform.propTypes = {
  currentUser: React.PropTypes.object.isRequired,
  patchUrl: React.PropTypes.string.isRequired
}
