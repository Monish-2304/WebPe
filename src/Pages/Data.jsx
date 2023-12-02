import React ,{useEffect,useState} from 'react'

const Data = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState('');
    const [filterText, setFilterText] = useState('');
    const [selectedFiltersMap, setSelectedFiltersMap] = useState({});
    
    useEffect(()=>{
        getData();
      },[]);

    //fetch data from api
    const getData=async()=>{
     try {
        const data=await fetch("https://jsonplaceholder.typicode.com/posts");
        const json=await data.json();
        setData(json);
        setFilteredData(json);
        console.log(json);
     } catch (error) {
        console.log("Data couldn't be fetched ",error);
     }
    }

    // Function to add filters , so that multiple filters can be handled
    const addFilter = () => {
        if (selectedFilter !== '' && filterText !== '') {
          setSelectedFiltersMap({
            ...selectedFiltersMap,
            [selectedFilter]: filterText
          });
          setFilters([...filters, selectedFilter]);
          setSelectedFilter('');
          setFilterText('');
        }
      };
    
      // Function to apply filters
      const applyFilters = () => {
        const isMatching = (obj) => {
          for (const filter in selectedFiltersMap) {
            const filterValue = selectedFiltersMap[filter];
            let filterKey = filterValue;
            
            if (filter === 'userId' || filter === 'id') {
              filterKey = parseInt(filterValue);
              if (!obj.hasOwnProperty(filter) || obj[filter] !== filterKey) {
                return false;
              }
            } else if (filter === 'title') {
              if (!obj.hasOwnProperty(filter) ||
                  obj[filter].toString().toLowerCase().indexOf(filterKey.toLowerCase()) === -1) {
                return false;
              }
            }
          }
          return true;
        };
      
        // Filter the data array based on the selected filters
        const filteredData = data.filter(isMatching);
        setFilteredData(filteredData);
      };
       
      // Function to clear filters
      const clearFilters = () => {
        setSelectedFiltersMap({});
        setFilters([]);
      };
    
      //render table based on filtered data
      const renderTableRows = () => {
        return filteredData.map((item) => (
          <tr className="border border-2 border-gray-400" key={item.id}>
            <td className="border border-2 border-gray-400">{item.userId}</td>
            <td className="border border-2 border-gray-400">{item.id}</td>
            <td className="border border-2 border-gray-400">{item.title}</td>
          </tr>
        ));
      };

  return (
    <div className="flex">
    <div className="flex flex-col m-4">
    <div className="flex flex-col">
    <div className="flex space-x-4 py-4"><select
          value={selectedFilter}
          onChange={(e) => setSelectedFilter(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md"
        >
          <option value="">Select Filter</option>
          <option value="userId">User Id</option>
          <option value="id">Post Id</option>
          <option value="title">Title</option> 
        </select>
        <input
          type="text"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-md flex-1"
          placeholder="Enter text..."
        />
        <button
          onClick={addFilter}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md"
        >
          Add Filter
        </button></div>
        
        <div className="flex flex-wrap mb-4 space-x-2">
        {filters.map((filter, index) => (
          <div
            key={index}
            className="bg-gray-200 px-3 py-1 rounded-md flex items-center"
          >
            {filter}: {selectedFiltersMap[filter]}
          </div>
        ))}
      </div>

      {/* Apply and Clear Filter Buttons */}
      
    </div>

    {/*apply and clear filters*/}
    <div>
    <div className="flex space-x-4">
        <button
          onClick={applyFilters}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-md"
        >
          Apply Filters
        </button>
        <button
          onClick={clearFilters}
          className="bg-red-500 text-white font-bold py-2 px-4 rounded-md"
        >
          Clear Filters
        </button>
    </div>
    </div>
    
    {/*display filtered data*/}
    <div>
      <div>
        <h2 className="text-xl my-2 font-bold">Data</h2>
        <div className="m-2 overflow-x-auto">
          <table className="max-w-screen">
            <thead className="border border-3 border-black">
              <tr>
                <th className="px-6 py-3 bg-gray-100 text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider border border-3 border-black">
                  User Id
                </th>
                <th className="px-6 py-3 bg-gray-100 text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider border border-3 border-black">
                  Post Id
                </th>
                <th className="px-6 py-3 bg-gray-100 text-center text-xs leading-4 font-medium text-gray-600 uppercase tracking-wider border border-3 border-black">
                  Title
                </th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
        </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default Data;
