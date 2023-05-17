import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';

export default function PagesNav(props) {
  const [pages,setPages] = useState(0)
  const [query] = useSearchParams();
  let currentPage = Number(query.get("page")) || 1;
  const len = props.length;
  
  useEffect(() => {
    doApiGetPages();
  },[])

  const doApiGetPages = async() =>{
    let url = props.apiCount;
    let resp = await axios.get(url); 
    setPages(resp.data.pages)
   
  }


  return (
    <>
 <div className='my-2'>
      
      {/* [...Array(100)] -> יצור מערך עם תאי נאל באורך 100 תאים 
      וככה ניתן לעשות לולאה על מספר בג'יי אס אקס*/}
        {/* <Link className={props.css} to={props.linkTo+Math.max(currentPage-1,1)}>קודם</Link> */}
      {[...Array(pages)].map((item,i) => {
        // ( (i+1) == currentPage ? " bg-info" : "") ->  מוסיף קלאס של רקע תכלת אם אנחנו בעמוד הנוכחי 
        return(
          <Link key={i} className={props.css + ( (i+1) == currentPage ? " bg-primary" : "") } to={props.linkTo+(i+1)}>{i+1}</Link>
        )
      })}
       {/* <Link className={props.css} to={props.linkTo+Math.min(currentPage+1,pages)}>הבא</Link> */}
    </div>
    </>
  )
}
