const BASE_URL = "http://localhost:5000";
const RESOURSE_URL = `${BASE_URL}/parking`;

const baseRequest = async ({ urlPath = "", method = "GET", body = null }) => {
    try {
        const reqParams = {
            method,
            headers: {
            "Content-Type": "application/json",
            },
        };

        if (body) {
            reqParams.body = JSON.stringify(body);
        }

        return await fetch(`${RESOURSE_URL}${urlPath}`, reqParams);
    } catch (error) {
        console.error("HTTP ERROR: ", error);
    }
};

// public functionality

export const getParkingList = async () => {
    const rawResponse = await baseRequest({ method: "GET" });

    return await rawResponse.json();
};

export const postParking = (body) => baseRequest({ method: "POST", body });

export const updateParking = (id, body) =>
    baseRequest({ urlPath: `/${id}`, method: "PATCH", body });

export const deleteParking = (id) =>
    baseRequest({ urlPath: `/${id}`, method: "DELETE" });