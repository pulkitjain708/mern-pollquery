import DataTable from 'react-data-table-component';
import {useParams} from 'react-router-dom'
import {useEffect,useState,useRef} from 'react'
import "../../styles/badge.css"
import services from '../../services';


const ExpandedComponent= ({ data }) => {
    let para=""
    Object.keys(data.response).forEach(
        (k)=>{
            para+=`${k} : ${data['response'][k]}\n`
        }
    )
    return <pre>{para}</pre>;
};


let DatatableView = (props) => {
    let {formId} = useParams(); 
    let [data,dataState]=useState(null);
    let [filteredData,filteredDataState]=useState(null);
    let [col,colState]=useState(null);
    let [key,keysState]=useState(null);
    const selectRef = useRef();
    const valueRef = useRef();
    const [filter,filterState] = useState([])
    const addFilter = ()=> {
        filterState(old=>
            [...old,{key:selectRef.current.value,
            value:valueRef.current.value
            }]
            )
    }
    useEffect(()=>{
        if(filter.length!==0){
        let newF = data.filter(d=>{
            let flags=[];            
            filter.forEach(o=>{
                    if(String(d['response'][o.key]).includes(o.value))
                    flags.push(true)
                    else
                    flags.push(false)
            })
            return flags.every(val=>val===true)
        })
        filteredDataState(newF);
        }
    },[filter])
 

    const FilterComponent = ({searchKeys}) =>{

        return (
            <div>
                <select ref={selectRef} style={{maxWidth:"200px",height:"30px"}}>
                {searchKeys && searchKeys.map(key=><option value={key}>{key}</option>)}
                </select>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <input type="text" ref={valueRef} placeholder="Value to Search For" style={{maxWidth:"200px"}}/>
                <button onClick={addFilter}>Add Parameter</button>
                <button onClick={()=>{filterState([]);}}>Reset Filters</button>
                <div>
                    {filter && filter.map(f=><span class="badge">{f.key}-{f.value}</span>)}
                </div>
                {/* <button>Download Results</button> */}
            </div>
        );
    }


    let deleteResponse = async (id) =>{
        if(window.confirm("Sure to Delete Response")){
            await services.deleteResponse({id})
            .then(data=>alert(data.status))
        }
    }
   
    useEffect(async ()=>{
        await services.datatable({formId})
          .then(res=>{
              if(res.length===0){
                  colState(null)
                  dataState(null)
                  return 
              }
                dataState(res);
              let keys = Object.keys(res[0].response)
              keysState(keys);
              keys=['Delete',...keys]
              let columns = keys.map(k=>{
                if(k==="Delete"){
                    return   {   name: 'Delete',
                    button: true,
                    cell: (row) => <button onClick={()=>deleteResponse(row['_id'])}>X</button>,
                }
                }  
                else return {
                  name:k
                ,selector:row=>row['response'][[k]],
                sortable:true,
                wrap:true,
                format:row=>{
                    if(row['response'][[k]].length>80)
                    return `${row['response'][[k]].slice(0,10)}...`
                    else
                    return row['response'][[k]]
                }
            }})
              colState(columns);
             
          })
    },[])

    return  <div>
        <FilterComponent searchKeys={key} />
        {data===null || col===null?"Loading...":<DataTable 
    columns={col} 
    expandableRows
    expandableRowsComponent={ExpandedComponent}
    pagination
    data={filteredData===null || filteredData.length===0?data:filteredData}
    />}</div>
}

export default DatatableView