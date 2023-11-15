import React, { useEffect, useState } from 'react'
import { successMessage } from '../../../utils/utils';
import Loading from '../../loading';
import ResourcesTable from './tableFrame';
import { getDistrictDataAPI, updateDistrictAPI, updateDistrictStatusAPI } from '../../../api/adminApi';

const DistrictManagement = () => {
    const [district, setDistrict] = useState([]);
    const [load, setLoad] = useState(true);
    const [reload, setReload] = useState(false)
  
    const getDistrictData = async () => {
        const data = await getDistrictDataAPI()
        setDistrict(data);
        setLoad(false);
    };
  
    const handleUpdate = async (id, value) => {
      const result = await updateDistrictAPI(id,value);
      if(result){
          successMessage("District update successful!")
          setReload(!reload);
      }
    };
  
    const handleBlockToggle = async (id, status) => {
      const result = await updateDistrictStatusAPI(id, status);
      if(result){
          successMessage(`District successfully ${status ? 'blocked' : 'unblocked'}!`);
          setReload(!reload);
      }
  };
  
    useEffect(() => {
      getDistrictData();
    }, [reload]);
  
    return load ? (
      <Loading />
    ) : (
      <ResourcesTable
        handleBlockToggle={handleBlockToggle}
        data={district}
        title={"District Management"}
        handleUpdate={handleUpdate}
      />
    );
}

export default DistrictManagement
