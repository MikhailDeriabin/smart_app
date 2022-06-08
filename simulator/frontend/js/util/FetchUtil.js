export class EnvEnum {
    static DATABASE_HOST = new EnvEnum("localhost");
    static DATABASE_PORT = new EnvEnum(8081);

    constructor(value) {
        this.value = value;
    }
}

const DBHost = EnvEnum.DATABASE_HOST.value;
const DBPort = EnvEnum.DATABASE_PORT.value;

export class FetchUtil {
    async post(path, data) {
        const fetchOptions = generateFetchObj('POST', data);
        try{
            const res = await fetch(path, fetchOptions);
            return await res.json();
        } catch(e){
            console.log(e);
            return null;
        }
    }

    async get(path) {
        const fetchOptions = { method: "GET" };
        try{
            const res = await fetch(path, fetchOptions);
            return await res.json();
        } catch(e){
            console.log(e);
            return null;
        }
    }

    async put(path, data) {
        const fetchOptions = generateFetchObj('PUT', data);
        try{
            const res = await fetch(path, fetchOptions);
            return await res.json();
        } catch(e){
            console.log(e);
            return null;
        }
    }

    async delete(path) {
        const fetchOptions = { method: "DELETE" };
        try{
            const res = await fetch(path, fetchOptions);
            return await res.json();
        } catch(e){
            console.log(e);
            return null;
        }
    }

    async postDB(pathEnd, data) {
        return await this.post(`http://${DBHost}:${DBPort}/api/${pathEnd}`, data);
    }

    async getDB(pathEnd) {
        return await this.get(`http://${DBHost}:${DBPort}/api/${pathEnd}`);
    }

    async putDB(pathEnd, data) {
        return await this.put(`http://${DBHost}:${DBPort}/api/${pathEnd}`, data);
    }

    async deleteDB(pathEnd) {
        return await this.delete(`http://${DBHost}:${DBPort}/api/${pathEnd}`);
    }
}

function generateFetchObj(method, data) {
    return {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    };
}