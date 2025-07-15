export const tokenService = {
  //Local storage token
  saveToken: (token: string) => {
    localStorage.setItem('authToken', token);
  },

  getToken: (): string | null => {
    return localStorage.getItem('authToken');
  },

  removeToken: () => {
    localStorage.removeItem('authToken');
  },

  // Cek Token
  hasToken: (): boolean => {
    return !!localStorage.getItem('authToken');
  },

};