export const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      return response;
    } catch (error) {
      console.error(error);
    }
  };
  