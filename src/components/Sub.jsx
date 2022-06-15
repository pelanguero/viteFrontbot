import { Component } from "react";
import axios from "axios";

class FileUpload extends Component {
  // API Endpoints
  custom_file_upload_url = `http://localhost:8080/upload`;

  constructor(props) {
    super(props);
    this.state = {
      image_file: null,
      image_preview: "",
    };
  }

  // Image Preview Handler
  handleImagePreview = (e) => {
    let image_as_base64 = URL.createObjectURL(e.target.files[0]);
    let image_as_files = e.target.files[0];

    this.setState({
      image_preview: image_as_base64,
      image_file: image_as_files,
    });
  };

  // Image/File Submit Handler
  handleSubmitFile = () => {
    if (this.state.image_file !== null) {
      let formData = new FormData();
      formData.append("myFile", this.state.image_file);
      //formData.append('id', 'pelangueroid');
      // the image field name should be similar to your api endpoint field name
      // in my case here the field name is customFile

      axios
        .post("http://localhost:8080/upload", formData, {
          headers: {
            token: localStorage.getItem("Session"),
          },
        })
        .then((res) => {
          console.log(`Success` + res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // render from here
  render() {
    return (
      <div>
        {/* image preview */}

        {/* image input field */}

        <div className="card">
          <div>
            <img src={this.props.image} alt={this.props.title} />
          </div>
          <div className="contenido-card">
            <h3>{this.props.title}</h3>
            <input
              type="file"
              onChange={this.handleImagePreview}
              name="myFile"
            />
            <button type="submit" onClick={this.handleSubmitFile}>
              Subir
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FileUpload;
