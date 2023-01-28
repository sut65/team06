const apiUrl = "http://localhost:8080";

///////////////////////////////////////////////////////////////////////////////

const GetAdminByID = async () => {

  const id = localStorage.getItem("Admin-id");

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  let result = await fetch(`${apiUrl}/admin/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.data) {
        return result.data;
      } else {
        return false;
      }
    });
  return result;

};
export { GetAdminByID };

///////////////////////////////////////////////////////////////////////////////

const GetStudentByID = async () => {

  const id = localStorage.getItem("Student-id");

  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  let result = await fetch(`${apiUrl}/student/${id}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.data) {
        return result.data;
      } else {
        return false;
      }
    });
  return result;
  
};
export { GetStudentByID };

///////////////////////////////////////////////////////////////////////////////
