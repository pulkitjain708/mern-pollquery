import '../../styles/inputComponents/Select.css';

let Select = props =>{
    let {label,options,required,onChange} = props;
    let unique = Math.random().toString(36).slice(3,7);
    let RenderedOptions;
    if (options)
    RenderedOptions=options.map((opt,i)=><option key={i} value={opt}>{opt}</option>)
    else
    RenderedOptions=<option key="1" value="Add Option">Add Option</option>;
    return (
        <div>
            <label for={unique}><b>{label}</b></label>
            <br/>
                <select 
                name={label}
                onChange={onChange}
                required={required}>
                    {RenderedOptions}           
                </select>
        </div>
    );
}

export default Select;

