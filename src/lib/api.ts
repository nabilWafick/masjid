import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

class ApiService {
  private api: AxiosInstance;

  constructor() {
    const baseUrl = process.env.BASE_URL;

    this.api = axios.create({
      baseURL: `${baseUrl}`,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.api.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("accessToken");

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          // Clear token and redirect to login
          localStorage.removeItem("accessToken");
          window.location.href = "auth/signin";
        }

        // Handle other errors
        if (error.response?.status === 404) {
          console.error("Resource not found:", error);
        }

        if (error.response?.status === 500) {
          console.error("Server error:", error);
        }

        return Promise.reject(error);
      }
    );
  }

  // GET method
  async get<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.get(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // POST method
  async post<T>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.post(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // PUT method
  async patch<T>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.patch(
        url,
        data,
        config
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // PUT method
  async put<T>(
    url: string,
    data: any = {},
    config: AxiosRequestConfig = {}
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.put(url, data, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // DELETE method
  async delete<T>(url: string, config: AxiosRequestConfig = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.api.delete(url, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

// Exporting a singleton instance of ApiService (optional)
const apiService = new ApiService();
export default apiService;

export { ApiService };
