import api from "./api";

// public functionality

export const getParkingList = async (filters) => {
    let parkingFacilityDict = (await api.get("", { params: filters })).data;
    let parkingFacilities = [];

    for(const [id, item] of Object.entries(parkingFacilityDict)) {
        parkingFacilities.push({ id, title: item.title, description: item.description, slots: item.slots })
    }

    return parkingFacilities;
};


export const postParking = (body) => api.post("", body);

export const updateParking = (id, body) =>
    api.patch(`/${id}`, body);

export const deleteParking = (id) =>
    api.delete(`/${id}`);

export const logIn = async (body) =>  {
    console.log(body)
    return (await api.get('/login', { params: body })).data
}
    
export const register = async (body) => 
    (await api.post('/register', body)).data