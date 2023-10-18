import service from "./config";

const getAllEvents = async ({ page, sort, keyword }: any) => {
  try {
    const response = await service.get("/events", {
      params: {
        page: page,
        sort: sort,
        keyword: keyword,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getEvent = async (id: string) => {
  try {
    const response = await service.get(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createEvent = async (event: any) => {
  try {
    const response = await service.post("/event", event);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const updateEvent = async (event: any) => {
  try {
    const response = await service.put(`/events/${event.id}`, event);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteEvent = async (id: string) => {
  try {
    const response = await service.delete(`/event/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export { getAllEvents, getEvent, createEvent, updateEvent, deleteEvent };
