import Card from '../containers/card'
import TextField from '../formFields/TextField'
import TextArea from '../formFields/TextArea'
import Select from '../formFields/Select'
import Rating from '../formFields/Rating'
import Geolocation from '../formFields/GeoLocation'
import FileUpload from '../formFields/FileUpload'
import DateTime from '../formFields/DateTime'

let FormFieldMapper = {
    "Card":Card,
    "TextField":TextField,
    "TextArea":TextArea,
    "Select":Select,
    "Rating":Rating,
    "GeoLocation":Geolocation,
    "FileUpload":FileUpload,
    "DateTime":DateTime
}

export default FormFieldMapper;