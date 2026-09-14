export class ApiResponse {
  static success(res, data, message = 'Success', statusCode = 200, meta = {}) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
      ...meta
    });
  }

  static error(res, message = 'An error occurred', statusCode = 500, error = null) {
    return res.status(statusCode).json({
      success: false,
      message,
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
}
