// Ambil URL dari .env.local yang sudah kamu buat
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllJobs = async () => {
  // 1. Ambil token yang tersimpan di browser
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/jobs`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      // 2. Kirim token di header Authorization dengan format Bearer
      'Authorization': `Bearer ${token}` 
    },
  });

  if (response.status === 401) {
    // 3. Jika ditolak, lempar error spesifik agar UI bisa menangkapnya
    throw new Error("Sesi login kamu sudah habis. Silakan login kembali.");
  }

  if (!response.ok) {
    console.error("❌ getAllJobs error:", response.status, response.statusText);
    throw new Error("Gagal mengambil data dari server.");
  }
  
  const data = await response.json();
  console.log("📦 getAllJobs response structure:", {
    isArray: Array.isArray(data),
    keys: Object.keys(data),
    data: data
  });
  return data;
};

export const loginUser = async(Credentials: object)=>{
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(Credentials)
  });
  if(!response.ok){
    const errorData = await response.json();
    throw new Error(errorData.message || 'Email or password is incorrect');
  }
  return await response.json();
}
export const registerUser = async (userData: object) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Gagal mendaftar");
  }

  return await response.json();
};

export const createJob = async (jobData: object) => {
  const token = localStorage.getItem("token");
  
  const response = await fetch(`${BASE_URL}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(jobData),
  });

  if (response.status === 401) {
    throw new Error("Sesi login kamu sudah habis. Silakan login kembali.");
  }

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Gagal membuat job opening");
  }

  return await response.json();
};
