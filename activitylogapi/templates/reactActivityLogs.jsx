
//import ActivityLogsText from './activitylogs';
//var activitylogs = require('./activitylogs');

var ActivityLogsAll = React.createClass({
  getInitialState: function () {
    return { modulename: '', message: '', clientip: '', urlpath:'' ,logdetails: '', createdby: "1", createddate: new Date().toUTCString(), id: '', Buttontxt: 'Save', data1: [] };
  },

  handleChange: function (e) {
    this.setState({ [e.target.name]: e.target.value });
  },
  componentDidMount() {
    this.getActivityLogs();
  },
  getActivityLogs() {
    $.ajax({
      url: "api/getlogs",
      type: "GET",
      dataType: 'json',
      ContentType: 'application/json',
      success: function (data) {
        this.setState({ data1: data });
      }.bind(this),
      error: function (jqXHR) {
        console.log(jqXHR);
      }.bind(this)
    });
  },
  deleteRecord(id) {
    var logsDelete = {
      'id': id
    };
    $.ajax({
      url: "/api/deleterecord/",
      dataType: 'json',
      type: 'POST',
      data: logsDelete,
      success: function (data) {
        alert(data.data);
        this.getActivityLogs();
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err);
      }.bind(this),
    });
  },
  editRecord(item) {
    this.setState({
      modulename: item.modulename,
      message: item.message,
      logdetails: item.logdetails,
      urlpath:item.urlpath,
      clientip: item.clientip,
      createdby: item.createdby,
      createddate: item.createddate,
      id: item._id, Buttontxt: 'Update'
    });
  },

  handleClick: function () {
    var Url = "";
    if (this.state.Buttontxt == "Save") {
      Url = "/api/insertrecord";
    }
    else {
      Url = "/api/updaterecord";
    }

    var activitylogsdata = {
      'modulename': this.state.modulename,
      'message': this.state.message,
      'urlpath': this.state.urlpath,
      'logdetails': this.state.logdetails,
      'clientip': this.state.clientip,
      'createdby': this.state.createdby,
      'createddate': this.state.createddate,
      'id': this.state.id
    }
    $.ajax({
      url: Url,
      dataType: 'json',
      type: 'POST',
      data: activitylogsdata,
      success: function (data) {
        alert(data.data);
        this.setState(this.getInitialState());
        this.getActivityLogs();
      }.bind(this),
      error: function (xhr, status, err) {
        alert(err);
      }.bind(this)
    });
  },

  render: function () {
    return (
      //React.createElement(activitylogs["default"], null)
      <div className="container" style={{ marginTop: '50px' }}>
        <p className="text-center" style={{ fontSize: '25px' }}><b>Activity Logs</b></p>
        <form>
          <div className="col-sm-12 col-md-12" style={{ marginLeft: '300px' }}>
            <table className="table-bordered">
              <tbody>
                <tr>
                  <td><b>Module Name</b></td>
                  <td>
                    <input className="form-control" type="text" value={this.state.modulename} name="modulename" onChange={this.handleChange} />
                    <input type="hidden" value={this.state.id} name="id" />
                  </td>
                </tr>

                <tr>
                  <td><b>Message</b></td>
                  <td>
                    <input type="text" className="form-control" value={this.state.message} name="message" onChange={this.handleChange} />
                  </td>
                </tr>
                <tr>
                  <td><b>Client IP Address</b></td>
                  <td>
                    <input type="text" className="form-control" value={this.state.clientip} name="clientip" onChange={this.handleChange} />
                  </td>
                </tr>
                <tr>
                  <td><b>URL</b></td>
                  <td>
                    <input type="text" className="form-control" value={this.state.urlpath} name="urlpath" onChange={this.handleChange} />
                  </td>
                </tr>
                <tr>
                  <td><b>Log Details</b></td>
                  <td>
                    <textarea className="form-control" value={JSON.stringify(this.state.logdetails)} name="logdetails" onChange={this.handleChange} />
                  </td>
                </tr>
                <tr>
                  <td><b>Created By</b></td>
                  <td>
                    <input type="text" className="form-control" readOnly="true" value={this.state.createdby} name="createdby" onChange={this.handleChange} />
                  </td>
                </tr>
                <tr>
                  <td><b>Created Date</b></td>
                  <td>
                    <input type="text" className="form-control" readOnly="true" value={this.state.createddate} name="createddate" onChange={this.handleChange} />
                  </td>
                </tr>
                <tr>
                  <td></td>
                  <td>
                    <input className="btn btn-primary" type="button" value={this.state.Buttontxt} onClick={this.handleClick} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-sm-12 col-md-12 " style={{ marginTop: '50px', marginLeft: '0px' }} >
            <table className="table-bordered"><tbody>
              <tr><th><b>S.No</b></th><th><b>MODULE NAME</b></th><th><b>MESSAGE</b></th><th><b>IP ADDRESS</b></th><th><b>URL</b></th><th><b>LOG DETAILS</b></th><th><b>CREATED BY</b></th><th><b>CREATED DATE</b></th><th><b>EDIT</b></th><th><b>DELETE</b></th></tr>
              {this.state.data1.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.modulename}</td>
                  <td>{item.message}</td>
                  <td>{item.urlpath}</td>
                  <td>{item.clientip}</td>
                  <td>{JSON.stringify(item.logdetails)}</td>
                  <td>{item.createdby}</td>
                  <td>{item.createddate}</td>
                  <td>
                    <button type="button" className="btn btn-success" onClick={(e) => { this.editRecord(item) }}>Edit</button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-info" onClick={(e) => { this.deleteRecord(item._id) }}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
            </table>
          </div>
        </form>
      </div>
    );
  }
});

ReactDOM.render(<ActivityLogsAll />, document.getElementById('root'))