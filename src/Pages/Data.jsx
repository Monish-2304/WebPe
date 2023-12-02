import React from 'react'

const Data = () => {
    useEffect(()=>{
        getData();
      },[]);
    const getData=async()=>{
        const data=await fetchData("https://jsonplaceholder.typicode.com/posts");
        const json=await data.json();
        console.log(json);
    }
  return (
    <div>
      Data
    </div>
  )
}

export default Data
