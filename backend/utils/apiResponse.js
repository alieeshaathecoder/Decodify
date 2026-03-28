class apiResponse {
    constructor(statusCode, data, message="success"){
        this.statusCode = statusCode,
        this.data = data
        this.success = statusCode
        this.message = message
    }
}

export default apiResponse