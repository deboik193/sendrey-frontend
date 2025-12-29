import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations, addLocation, deleteLocation } from '../Redux/userSlices/locationsSlice';

export const useLocations = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.locations);

  useEffect(() => {
    if (items.length === 0) dispatch(fetchLocations());
  }, [dispatch]);

  const saveNewLocation = (data) => dispatch(addLocation(data));
  const removeLocation = (id) => dispatch(deleteLocation(id));

  return { locations: items, loading, error, saveNewLocation, removeLocation };
};