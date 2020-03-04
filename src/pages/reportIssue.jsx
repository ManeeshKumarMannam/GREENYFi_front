import React, { useState, Component } from 'react';
import { commonApiCall,getJwt } from '../redux/actions/index'
import { connect } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../configs/config'
import Script from 'react-load-script'
import Map from "../pages/map"
import Geocode from "react-geocode";
import "react-toggle/style.css"
import _ from 'lodash';
import Toggle from 'react-toggle'
import axios from 'axios'
toast.configure()
Geocode.setApiKey("AIzaSyB6d8OKRmld41gPMawF6mmJQYflu_4NRKo");
Geocode.enableDebug();

class GooglePlaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: 23.033863,
            longitude: 55.030603,
            area: "",
            city: "",
            surrDetails:'',
            description:'',
            urban:false,
            plantation:false,
            images:[],
            errors:{},
            imagesArr:[],
            images_upload:[]
        }
    }
    componentDidMount() {
        this.getMyLocation()
    }
    getMyLocation = () => {
        const location = window.navigator && window.navigator.geolocation
        if (location) {
            location.getCurrentPosition((position) => {
                console.log("position", position)
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }, () => this.getLocationdata(this.state.latitude, this.state.longitude))
            }, (error) => {
            })
        }
    }
    getLocationdata = (lat, lng) => {
        let _this = this;
        this.setState({
            latitude: lat, longitude: lng
        })
        return new Promise(function (resolve, reject) {
            var request = new XMLHttpRequest();
            var method = 'GET';
            var url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyB6d8OKRmld41gPMawF6mmJQYflu_4NRKo& libraries=places`
            var async = true;
            request.open(method, url, async);
            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    if (request.status == 200) {
                        var data = JSON.parse(request.responseText);
                        var addressData = data.results[0] ? data.results[0].formatted_address : "";
                        _this.setState({ address: addressData })
                        var address = data.results[0] ? data.results[0].address_components : data.results[0];
                        if (address != "") {
                            let area = _.filter(address, (addr) => {
                                return _.includes(addr.types, 'sublocality') || _.includes(addr.types, 'locality');
                            });
                            _this.setState({ area: area.length && _.head(area).long_name ? _.head(area).long_name : "" }, () => {
                            });
                            let city = _.filter(address, (addr) => {
                                return _.includes(addr.types, 'administrative_area_level_2');
                            });
                            _this.setState({ city: city.length && _.head(city).long_name ? _.head(city).long_name : "" }, () => {
                            });
                        }
                        resolve(address);
                    }
                    else {
                        reject(request.status);
                    }
                }
            };
            request.send();
        });
    };


    handleScriptLoad() {
        const inputEl = document.getElementById('address-input');
        /*global google*/
        var options = {
            //types: ['address'],
            // componentRestrictions: { country: 'ae' }
        };
        this.autocomplete = new google.maps.places.Autocomplete(inputEl, options);
        this.autocomplete.addListener('place_changed', this.handlePlaceSelect.bind(this));
    }

    handlePlaceSelect = () => {
        console.log(this.autocomplete.getPlace(), "sh");
        let places = this.autocomplete.getPlace()
        this.getCoordinates([places])
    }


    getCoordinates = (val) => {
        if (val && val[0] && val[0].address_components) {
            if (val && Array.isArray(val) && val.length && val[0].geometry) {
                this.setState({
                    latitude: val[0].geometry.location.lat(),
                    longitude: val[0].geometry.location.lng(),
                }, () => this.getLocationdata(this.state.latitude, this.state.longitude))
            }
        }
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value })
        if (event.target.value) {
          this.setState({
            errors: Object.assign(this.state.errors, { [event.target.name]: "" })
          });
        }
      }


    submit = async (type) => {
        let { location, latitude, longitude, area, city, images_upload, description, surrDetails, urban , plantation } = this.state
        if (images_upload.length>0) {
        const requestParams = {
            location:area,city,
            lat:latitude,
            long:longitude,
            area,
            city,
            images:images_upload,
            description,
            surroundingDetails:surrDetails,
            isUrban:urban,
            isSuitableForPlantation:plantation,
            status:type,
            }
            const authorized = getJwt() ? true : false;
            let response = await this.props.commonApiCall(API_URL + 'issues/createIssue', "post", requestParams, '', authorized)
            if(response&&response.status===1){
                console.log(response);
                // localStorage.setItem('token',response.access_token)
                toast.success(response.message, { position: "top-right", autoClose: 2000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true });
            }
        }else{
            toast.error('Upload atleast one image', { position: "top-right", autoClose: 2000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true });
        }
    }

    fileChangedHandler3 = (e) => {
        this.setState({ multibeforeUpload: true })
        var imagesArr = this.state.imagesArr;
        var self = this
        var files = e.target.files;
        this.setState({ imgs_Arr: files })
        for (var i = 0, f; f = files[i]; i++) {
          if (!f.type.match('image.*')) {
            continue;
          }
          var reader = new FileReader();
          reader.onload = (function (theFile) {
            return function (e) {
              imagesArr.push({ image: e.target.result, url: theFile.name })
              self.setState({ imagesArr, multiple_img: true })
            };
          })(f);
          reader.readAsDataURL(f);
        }
      }

      multipleFileUpload = (val) => {
        if (this.state.productId != '') {
          this.setState({ multiView: true })
          const authorized = getJwt() ? true : false;
         
            var imagefile = this.state.imgs_Arr
            var additionalImages = this.state.additionalImages;
            var formData = new FormData()
            for (const file of imagefile) {
              formData.append('file', file, file.name)
          }
          axios
            .post(API_URL + 'multipleFileUpload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization:localStorage.getItem('token')
              }
            })
    
            .then(response => {
              if (response ) {
                // swal('files uploaded successfully', '', 'success')
                let { data } = response
                console.log("data",data);
                
                this.setState({images_upload:data.data.images} )
                // var test = []
                // if (val === 'images') {
                //   var pics = data.data.filePath
                //   var test = pics.map(each => {
                //     additionalImages.push(each)
                //     return { "filePath": each.filePath }
                //   })
                //   extraImages.push(...test)
                //   this.setState({ additionalImages: additionalImages, extraImages: extraImages, multiView: true, multibeforeUpload: !this.state.multibeforeUpload, imgs_Arr: [], imagesArr: [], multiple_img: !this.state.multiple_img })
                // } else if (val === 'video') {
                //   var vid = data.data
                //   var testVid = vid.filePath.map(each => {
                //     additionalVideos.push(each)
                //     return { "filePath": each.filePath, 'thumbNailFilePath': each.thumbNailFilePath }
                //   })
                //   extraVideos.push(...testVid)
                //   this.setState({ additionalVideos: additionalVideos, extraVideos: extraVideos, multivideoUpload: !this.state.multivideoUpload, videoArr: [], video_Arr: [] })
                // } else {
                //   var aud = data.data
                //   var testVid = aud.filePath.map(each => {
                //     additionalAudios.push(each)
                //     return { "filePath": each.filePath }
                //   })
                //   extraAudios.push(...testVid)
                //   this.setState({ additionalAudios: additionalAudios, extraAudios: extraAudios, multiaudioUpload: !this.state.multiaudioUpload, audioArr: [], audio_Arr: [] })
                // }
              }
            })
            .catch(err => console.log(err))
        } else {
        //   swal('Proporcione información del artículo', '', 'error')
        }
      }
    render() {
        let { latitude, longitude, area, city,surrDetails,description,urban,plantation,errors } = this.state
        console.log("value", area, city)

        return (
            <section>
                <Script
                    onLoad={this.handleScriptLoad.bind(this)}
                />
                <div className="form-group">
                    <input type="text"
                        autoComplete="new-password"
                        className="form-control"
                        id="address-input"
                        name="address"
                        value={this.props.locationvalue}
                        placeholder={"Search Location"}
                        onBlur={this.props.onBlur}
                        className="form-control form-input"
                        onClick={this.props.onClick}
                        onChange={this.props.handleLocation}

                    />
                </div>
                <h3>area:{area}</h3>
                <h3>city:{city}</h3>
                <Map
                    isMarkerShown={true}
                    // getCoordinates={this.getCoordinates}
                    defaultCenter={{ lat: latitude ? latitude : 23.033863, lng: longitude ? longitude : 55.030603 }}
                    lat={latitude ? latitude : 23.033863}
                    lng={longitude ? longitude : 55.030603}
                    zoom={12}
                />
                 <label >Description</label>
                <textarea type="text" placeholder="Enter Description" name="description" value={description} onChange={(e) => this.handleChange(e)} />
                <span className='err-msg'>{errors.description}</span>

                <label >Surrounding Details</label>
                <input type="text" placeholder="Enter landmark" name="surrDetails" value={surrDetails} onChange={(e) => this.handleChange(e)} />


                <label >Urban</label>
                <Toggle
                    checked={urban ? true : false}
                    className='custom-classname'
                    onChange={() => this.setState({ urban:!this.state.urban })}
                  />

               <label >isSuitableForPlantation</label>
                <Toggle
                    checked={plantation ? true : false}
                    className='custom-classname'
                    onChange={() => this.setState({ plantation:!this.state.plantation })}
                  />


                  <div className="form-group inputDnD mb-0">
                    <div className="upload-overlay d-flex justify-content-center align-items-center">
                      <div className="upload-wrapper">
                        <i className="fa fa-upload"></i>
                        <span><button type="button"  >Choose a file</button> or drag it here</span>
                      </div>
                    </div>
                    <label className="sr-only" >File Upload</label>
                    <input type='file'
                      className='form-control-file text-primary font-weight-bold'
                      name='image'
                      id='file1'
                      accept='images/*'
                      multiple
                      data-title='Drag and drop a file'
                      onChange={this.fileChangedHandler3.bind(this)} />
                  </div>

               <button type='button' onClick={()=>this.submit('requested')}>submit</button>
               <button type='button' onClick={()=>this.submit('notRequested')}>Drafted</button>

               <button type='button' onClick={()=>this.multipleFileUpload()}>fileupload</button>

            </section>
        );
    }
}

export default connect(null, { commonApiCall })(GooglePlaces);


