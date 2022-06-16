import { $authhost, $host } from ".";


export const createDevice = async (device)=>{
    const {data} = await $authhost.post('api/device', device)
    return data
}

export const fetchDevices = async (query)=>{
    const {data} = (query !== '?') ? await $host.get('api/device' + query) : await $host.get('api/device')
    return data
} 

export const fetchOneDevice = async (id)=>{
    const {data} = await $host.get(`api/device/${id}`)
    return data
}

export const deleteDevice = async (id)=>{
    const {data} = await $authhost.delete(`api/device/${id}`)
    return data
}

export const updateDevice = async (device)=>{
    const {data} = await $authhost.put('api/device', device)
    return data
}