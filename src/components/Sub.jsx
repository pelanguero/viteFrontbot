import { Component } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
//import { useNavigate} from 'react-router-dom';
class FileUpload extends Component {
  state={goto:false}
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

  gotoCreateProject = () => {
    this.setState({goto:true});
  };

  render() {
    if(this.state.goto){
      return(<Navigate to="/newProject" />);

    }else{
      return (
        <div>
          <div className="card">
            <div>
              <img src={this.props.image} alt={this.props.title} />
            </div>
            <div className="contenido-card">
              <h3>{this.props.title}</h3>
              
              <button onClick={this.gotoCreateProject}>
                Crear proyecto
              </button>
            </div>
          </div>
        </div>
      );
    }
    
  }
}

export default FileUpload;
