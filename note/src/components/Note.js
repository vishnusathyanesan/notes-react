import React, { Component } from "react";

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      current:{
        title: "",
        description: ""
      }
    };
  }
  // handleChange = e => {
  //   // console.log(e.target.name,e.target.value)
  //   this.setState({current:{ title : e.target.value }});
  // };
  handleSubmit = e => {
    e.preventDefault();
    var form = e.target;
    console.log(form.elements['title'].value);
    var dataSubmited = { title : form.elements['title'].value, description: form.elements['description'].value}
    // this.setState({current:{ title : form.elements['title'].value, description: form.elements['description'].value}});
    // const { title, description } = dataSubmited;
    // const lead = { title, description };
    const conf = {
      method: "post",
      body: JSON.stringify(dataSubmited),
      headers: new Headers({ "Content-Type": "application/json" })
    };
    fetch('api/notes/', conf)
    .then(response => response.json())
    .then(response => {
      console.log(response);
      this.setState({ data: response,current: {title: "",description: "" }});
    });
  };
  componentWillMount() {
    fetch("api/notes/")
      .then(response => {
        if (response.status !== 200) {
          return this.setState({ placeholder: "Something went wrong" });
        }
        return response.json();
      })
      .then(data => this.setState({ data: data }));
  }
  render(){
    const data = this.state.data;
    const { title, description } = this.state.current;
    return (
      <div className="row">
          <div className="col-sm-4">
            <div className="card">
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <h5 className="card-title">
                    <div className="field">
                      <label className="label">Title</label>
                      <div className="control">
                        <input
                          className="input"
                          type="text"
                          name="title"
                          required
                        />
                      </div>
                    </div>
                  </h5>
                  <div className="card-text">
                    <div className="field">
                      <label className="label">Description</label>
                      <div className="control">
                        <textarea
                          className="input textarea-input"
                          type="textarea"
                          name="description"
                          rows="3"
                          required
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="control">
                    <button type="submit" className="button is-info">
                      Add note
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {
            data.map(el => (
              <div className="col-sm-4" key={el.pk}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{el.fields.title}</h5>
                    <p className="card-text">{el.fields.description}</p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    );
  }
}

export default Note;
